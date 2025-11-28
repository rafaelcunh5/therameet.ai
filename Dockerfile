# Node 18 for Next.js 14
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN npm i -g pnpm && pnpm i --frozen-lockfile || pnpm i

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm i -g pnpm && pnpm i --frozen-lockfile || pnpm i && pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 3000
CMD ["pnpm","start"]
