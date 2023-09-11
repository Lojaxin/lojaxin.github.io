#第一步构建初始化; 别名:install
FROM node:16-alpine AS install
#创建工作目录,后序的构建步骤需要指明工作目录
WORKDIR  /webServer

# 拷贝 package.json 和 package-lock.json 到工作目录
COPY package.json package-lock.json ./
RUN npm install

# 第二步构建,打包;
FROM node:16-alpine AS builder
WORKDIR /webServer

COPY . .
COPY --from=install /webServer/node_modules ./node_modules
RUN npm run build

# 第三步构建; 别名:runner
FROM node:16-alpine AS runner
WORKDIR  /webServer

ENV NODE_ENV production

#将所有npm run start需要的文件拷贝到工作目录下
COPY --from=builder /webServer/next.config.js ./next.config.js
COPY --from=builder /webServer/public ./public
COPY --from=builder /webServer/api ./api
COPY --from=builder /webServer/components ./components
COPY --from=builder /webServer/store ./store
COPY --from=builder /webServer/utils ./utils
COPY --from=builder /webServer/global.scss ./global.scss
COPY --from=builder /webServer/server.js ./server.js
COPY --from=builder --chown=nextjs:nodejs /webServer/.next ./.next
COPY --from=builder /webServer/node_modules ./node_modules
COPY --from=builder /webServer/package.json ./package.json

EXPOSE 3000

# 启动服务
CMD ["npm","run", "start"]