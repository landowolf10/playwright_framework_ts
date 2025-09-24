# Base image oficial de Playwright con dependencias
FROM mcr.microsoft.com/playwright:v1.41.2-focal

# Set working directory
WORKDIR /app

# Copiar solo package.json y package-lock.json para cache de npm install
COPY package.json package-lock.json playwright.config.ts ./

# Instalar dependencias de Node y Playwright
RUN npm ci
RUN npx playwright install --with-deps

# Copiar el resto del código fuente
COPY src ./src

# Establecer variable opcional de test
ENV TEST_FILE=""

# Comando por defecto para ejecutar los tests
CMD ["sh", "-c", "npx playwright test $TEST_FILE"]