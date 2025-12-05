import asyncio
import json
import datetime
import re
import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from playwright.async_api import async_playwright

# =====================================================
#                 Flask 初始化部分
# =====================================================

app = Flask(__name__)
CORS(app)
# 静态文件目录（保存 index.html, availability.html, script.js, styles.css）
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
# =====================================================
#                 工具函数：解析 title
# =====================================================

def parse_title(title: str):
    """
    输入格式例子：
      "8:00am - 9:00am - Available"
      "11:00pm - 1:00am - Unavailable"
      "8:00am Wednesday, November 26, 2025 - 2nd Floor - 2122"
    返回 (time_str, status, room_name)
    """

    parts = [p.strip() for p in title.split(" - ")]

    # 最后一个字段是 status
    status = parts[-1]

    # 倒数第二个字段是房间名称（若存在）
    if len(parts) > 2:
        room_name = parts[-2]
        time_str = " - ".join(parts[:-2])
    else:
        # 格式不标准时的 fallback
        room_name = "Unknown"
        time_str = parts[0]

    return time_str, status, room_name


def parse_time_range(time_str):
    """
    支持三种格式：
    A) '1:00pm - 2:00pm'
    B) '11:00pm - 1:00am'  (跨天)
    C) '8:00am Wednesday, November 26, 2025 - Room ...'
       -> 仅一个时间，自动 +1 小时
    """

    # 抓取所有时间
    full_times = re.findall(r"\d{1,2}:\d{2}\s*(?:am|pm)", time_str.lower())

    # 当前日期
    today = datetime.datetime.now().date()

    def to_dt(t):
        return datetime.datetime.strptime(t.strip(), "%I:%M%p") \
            .replace(year=today.year, month=today.month, day=today.day)

    # 只有一个时间 —— 自动 +1 小时
    if len(full_times) == 1:
        start_dt = to_dt(full_times[0])
        end_dt = start_dt + datetime.timedelta(hours=1)
        return start_dt, end_dt

    # 两个以上 —— 前两个为开始与结束
    if len(full_times) >= 2:
        start_dt = to_dt(full_times[0])
        end_dt = to_dt(full_times[1])

        # 跨天
        if end_dt <= start_dt:
            end_dt += datetime.timedelta(days=1)

        return start_dt, end_dt

    raise ValueError(f"无法从 time_str 提取有效时间: {time_str}")


# =====================================================
#                 Playwright 爬虫函数
# =====================================================

async def fetch_single_eid(page, eid):
    """
    抓取单个 eid 的所有 events
    """
    selector = f'td.fc-timeline-lane.fc-resource[data-resource-id="{eid}"]'
    td = await page.query_selector(selector)

    if not td:
        print(f"❌ Fail to find sources: {eid}")
        return []

    # 房间名称
    name_selector = f'td.fc-datagrid-cell.fc-resource[data-resource-id="{eid}"] .fc-cell-text'
    name_elem = await page.query_selector(name_selector)
    room_name_text = await name_elem.inner_text() if name_elem else "Unknown"

    events = await td.query_selector_all(".fc-timeline-event-harness a[title]")
    results = []

    now = datetime.datetime.now()

    for e in events:
        title = await e.get_attribute("title")
        if not title:
            continue

        time_str, status_str, _ = parse_title(title)
        start_time, _ = parse_time_range(time_str)

        # 过滤过去的事件
        if start_time < now:
            continue

        results.append({
            "eid": eid,
            "Name": room_name_text,
            "time": time_str,
            "status": status_str
        })

    return results


async def fetch_all():
    """
    读取 eid 列表，并依序抓取全部数据
    """
    # 读取 eid 列表
    with open("codeList4Shapiro2ndFloor.txt", "r") as f:
        eids = [line.strip() for line in f if line.strip()]

    print("Reading eid lists: ", eids)

    url = "https://umich.libcal.com/spaces?lid=2761&gid=5040"

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("⏳ loading the page...")
        await page.goto(url, timeout=0)
        await page.wait_for_timeout(3000)

        all_results = []

        for eid in eids:
            print(f"➡ Fetching {eid} ...")
            data = await fetch_single_eid(page, eid)
            all_results.extend(data)

        await browser.close()
        print("Fetching completed, total", len(all_results), "records")
        return all_results


def save_json(data, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"💾 JSON saved to {filename}")


# =====================================================
#                 API 路由：触发后台抓取
# =====================================================

@app.route("/api/run_fetch")
def run_fetch():
    print("\n==========  run_fetch called  ==========\n")
    try:
        print("Before fetch_all()")
        data = asyncio.run(fetch_all())
        print("After fetch_all()")
        save_json(data, os.path.join(STATIC_DIR, "record.json"))
        print("Saved record.json")
        return jsonify({"status": "success", "count": len(data)})
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"status": "error", "message": str(e)})


# =====================================================
#                 前端页面服务（静态文件）
# =====================================================

@app.route("/")
def serve_index():
    return send_from_directory(STATIC_DIR, "index.html")

@app.route("/availability.html")
def serve_availability():
    return send_from_directory(STATIC_DIR, "availability.html")

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(STATIC_DIR, filename)

@app.route("/record.json")
def serve_record():
    return send_from_directory(STATIC_DIR, "record.json")


# =====================================================
#                 Flask 启动
# =====================================================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
