FROM node:current-alpine AS build

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY static static
COPY src src
COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .

RUN pnpm run build

FROM caddy:alpine AS prod

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /app/build /usr/share/caddy
