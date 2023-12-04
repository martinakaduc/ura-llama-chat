FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
CMD npm run preview -- --host 0.0.0.0
