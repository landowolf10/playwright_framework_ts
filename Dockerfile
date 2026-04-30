FROM mcr.microsoft.com/playwright:v1.51.0-jammy

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
RUN npx playwright install --with-deps

COPY . .

# ── Environment ────────────────────────────────────────────────────────────────
ENV BASE_URL="https://www.saucedemo.com"
ENV METRICS_PORT=9100
# CI=true disables interactive output and enables automatic retries in Playwright
ENV CI=true

# Establecer variable opcional de test
ENV TEST_FILE=""

# Comando por defecto para ejecutar tests
CMD ["sh", "-c", "npx playwright test $TEST_FILE", "--retries=2", "--reporter=list,html"]
