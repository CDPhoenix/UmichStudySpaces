#!/bin/bash
# 快速生成连接配置

echo "🔗 生成连接配置..."
echo ""

# 创建后端配置
cd server
if [ ! -f .env ]; then
  cp .env.example .env 2>/dev/null || echo "# 后端环境变量
DATABASE_URL=你的Neon数据库连接字符串
CLERK_SECRET_KEY=你的Clerk Secret Key
PORT=3001" > .env
  echo "✅ 已创建 server/.env"
  echo "   请编辑 server/.env 填入实际值"
else
  echo "⚠️  server/.env 已存在，跳过"
fi

# 创建前端配置
cd ..
if [ ! -f .env ]; then
  cp .env.example .env 2>/dev/null || echo "# 前端环境变量
VITE_API_URL=http://localhost:3001
VITE_CLERK_PUBLISHABLE_KEY=你的Clerk Publishable Key" > .env
  echo "✅ 已创建 .env"
  echo "   请编辑 .env 填入实际值"
else
  echo "⚠️  .env 已存在，跳过"
fi

echo ""
echo "📋 下一步："
echo "   1. 编辑 server/.env 填入数据库和 Clerk 密钥"
echo "   2. 编辑 .env 填入 Clerk 公钥"
echo "   3. 运行 ./start.sh 启动应用"
echo ""
