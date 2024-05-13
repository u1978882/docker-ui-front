#Dockerfile

FROM node:18-alpine AS docktopus-web

LABEL Developers="Lluis Vinent & Arnau Costa"

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

USER node:node

CMD ["node","build/index.js"]