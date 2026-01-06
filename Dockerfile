# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json package-lock.json ./

# Security: Use npm ci for deterministic, secure installs
# Security: Run npm audit to detect vulnerabilities
RUN npm ci --legacy-peer-deps && \
    npm audit --audit-level=moderate || true

# Security: Check for suspicious postinstall scripts
RUN find node_modules -name "package.json" -exec grep -l '"postinstall"\|"install"\|"preinstall"' {} \; | \
    while read pkg; do \
      echo "Checking package: $pkg"; \
      grep -A 5 '"scripts"' "$pkg" || true; \
    done

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Security: Scan built files for malicious code patterns
RUN find .next -name "*.js" -type f -exec grep -l "159\.89\.142\.251\|wget.*bash\|setup2\.sh\|exec.*spawn.*wget\|child_process.*exec" {} \; && \
    (echo "MALICIOUS CODE DETECTED IN BUILD ARTIFACTS!" && exit 1) || \
    echo "Build artifacts scanned - no malicious code detected"

# Security: Check for suspicious binaries (xmrig, miners, etc.)
RUN find . -type f -perm +111 -exec file {} \; | grep -i "executable" | grep -v "node\|npm" && \
    (echo "SUSPICIOUS BINARY DETECTED!" && exit 1) || \
    echo "No suspicious binaries found"

# Security: Check for malicious scripts
RUN find . -name "*.sh" -o -name "setup2.sh" -o -name "a3.sh" -o -name "runnv" -o -name "lived.sh" -o -name "alive.sh" | \
    grep -v "node_modules" && \
    (echo "MALICIOUS SCRIPT DETECTED!" && exit 1) || \
    echo "No malicious scripts found"

# Step 6: Create a lightweight image for the final output
FROM node:18-alpine

# Security: Install security tools
RUN apk add --no-cache \
    file \
    && rm -rf /var/cache/apk/*

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Step 7: Set the working directory
WORKDIR /app

# Step 8: Copy only necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# Security: Final scan for malware before container starts
RUN echo "Final security scan..." && \
    find . -name "*xmrig*" -o -name "*miner*" -o -name "*monero*" | \
    grep -v "node_modules" && \
    (echo "CRYPTOMINER DETECTED!" && exit 1) || \
    echo "No cryptominers detected" && \
    find .next -name "*.js" -exec grep -l "159\.89\.142\.251\|wget.*bash\|setup2" {} \; 2>/dev/null && \
    (echo "MALICIOUS CODE IN .next!" && exit 1) || \
    echo ".next directory clean"

# Security: Remove unnecessary tools that could be used for attacks
RUN rm -f /usr/bin/wget /usr/bin/curl 2>/dev/null || true

# Security: Set proper permissions
RUN chown -R nextjs:nodejs /app

# ************ PORTS ************#
# PORT=5500#UAT
# PORT=3030#PROD
# PORT=3020#LIVE

# ENV=UAT
# ENV=production

# Step 9: Expose the port that the app will run on
EXPOSE 5500

# Step 10: Set the port environment variable
ENV PORT=5500
ENV NODE_ENV=UAT

# Security: Switch to non-root user
USER nextjs

# Step 11: Start the Next.js server
CMD ["npm", "start"]