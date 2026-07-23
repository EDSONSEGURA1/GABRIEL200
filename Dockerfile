FROM node:20-alpine AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps --include=dev

COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/src/main"]