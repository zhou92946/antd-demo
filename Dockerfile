# 基于Node镜像构建
FROM node:14-alpine

# 创建工作目录
WORKDIR /app

# 安装项目依赖
COPY package*.json ./
RUN npm install

# 拷贝项目代码
COPY . .

# 构建生产环境代码
RUN npm run build

# 暴露容器端口
EXPOSE 80

# 启动应用
CMD ["npm", "start"]