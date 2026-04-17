FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma/ 
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma generate
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001
# On lance les migrations avant de démarrer le serveur
CMD ["sh", "-c", "yarn prisma migrate deploy && node dist/index.js"]