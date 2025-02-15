# This is a multi-stage Dockerfile. It's optimized for Docker build caching for production builds.
FROM oven/bun:alpine AS base
RUN apk add --no-cache libstdc++ ncurses-libs openssl

ENV DOPPLER_TOKEN
ENV ENVIRONMENT

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
  echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
  apk add doppler



# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Fetch secrets from Doppler
RUN doppler run -p app-codapdf -c ${ENVIRONMENT} -- doppler secrets download --no-file --format env > .env

# Run migrations
RUN sh -c 'i=1; \
  while [ $i -le 3 ]; do \
  if bun run migration:run; then \
  break; \
  else \
  echo "Attempt $i failed, retrying..."; \
  i=$((i+1)); \
  sleep 5; \
  fi; \
  done; \
  if [ $i -gt 3 ]; then \
  echo "Command failed after 3 attempts."; \
  exit 1; \
  fi'

# Build the source code and run migrations
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_MANUAL_SIG_HANDLE=true 

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts .
COPY --from=builder --chown=nextjs:nodejs /app/cache-handler.mjs .
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ARG PORT
EXPOSE $PORT

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["bun", "run", "server.js"]
