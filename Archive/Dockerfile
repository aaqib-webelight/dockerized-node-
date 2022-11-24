FROM node:16.13.1 as stage1 
WORKDIR /usr/src/app
COPY . .
#RUN npm install
#	RUN npm run build 

FROM nginx 
COPY --from=stage1 /usr/src/app* /use/share/nginx/html

