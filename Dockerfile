FROM node:20-bullseye AS base

FROM base AS builder

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./

# Copy prisma schema before npm install
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy remaining files
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG ENV_FILE

COPY $ENV_FILE .env

RUN npm run cloud-build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder /app/.env .env
RUN chown nextjs:nodejs .env


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ARG HOSTNAME

CMD node server.js
