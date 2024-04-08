# Use Node.js 18.x as the base image
FROM mcr.microsoft.com/playwright:v1.41.2-focal

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json playwright.config.ts ./

# Install npm dependencies
RUN npm install
#RUN npm install playwright
#RUN npx playwright install --with-deps

# Copy the entire source folder including all subfolders
COPY src ./src


# Environment variable for specifying the WebDriverIO configuration file
ENV TEST_FILE=""

# Command to run WebDriverIO tests
CMD ["sh", "-c", "npx playwright test $TEST_FILE"]