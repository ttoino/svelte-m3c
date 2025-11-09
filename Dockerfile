FROM mcr.microsoft.com/playwright:v1.56.1 AS base

RUN chmod 0777 /usr/bin

USER 1000

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable
RUN pnpm install --frozen-lockfile

FROM base AS test

VOLUME "/app"
EXPOSE 9323
ENV CI=true

ENTRYPOINT [ "pnpm", "run", "test" ]

FROM base AS build

COPY static static
COPY src src
COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .

RUN pnpm run build

FROM caddy:alpine AS prod

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /app/build /usr/share/caddy
