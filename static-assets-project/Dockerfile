#build stage:

FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build


#run stage

FROM nginx:1.17
COPY --from=builder /app/build /usr/share/nginx/html









