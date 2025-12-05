#!/bin/bash
# 启动应用脚本

echo "🚀 启动 Study Spaces 应用..."
echo ""

# 检查后端服务器是否已在运行
if lsof -ti:3001 > /dev/null 2>&1; then
  echo "⚠️  后端服务器已在运行 (端口 3001)"
else
  echo "▶️  启动后端服务器..."
  cd server
  npm start > /tmp/backend.log 2>&1 &
  BACKEND_PID=$!
  echo "   后端 PID: $BACKEND_PID"
  echo "   日志文件: /tmp/backend.log"
  cd ..
  sleep 2
fi

# 检查前端服务器是否已在运行
if lsof -ti:5173 > /dev/null 2>&1 || lsof -ti:8080 > /dev/null 2>&1; then
  echo "⚠️  前端服务器已在运行"
  echo ""
  echo "✅ 应用已启动！"
  echo "   前端: http://localhost:5173 或 http://localhost:8080"
  echo "   后端: http://localhost:3001"
else
  echo ""
  echo "▶️  启动前端服务器..."
  echo ""
  echo "✅ 应用启动中..."
  echo "   前端将在 http://localhost:5173 启动"
  echo "   后端运行在 http://localhost:3001"
  echo ""
  echo "按 Ctrl+C 停止服务器"
  echo ""
  npm run dev
fi

