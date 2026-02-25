# Base image oficial de Playwright con dependencias
FROM mcr.microsoft.com/playwright:v1.41.2-focal

# Set working directory
WORKDIR /app

# Copiar package.json y package-lock.json primero para cache de npm install
COPY package.json package-lock.json ./

# Instalar dependencias de Node
RUN npm ci

# Instalar Playwright browsers
RUN npx playwright install --with-deps

# Copiar el resto del proyecto (src, configuraciones, etc.)
COPY . .

# Establecer variable opcional de test
ENV TEST_FILE=""

# Comando por defecto para ejecutar tests
CMD ["sh", "-c", "npx playwright test $TEST_FILE"]
