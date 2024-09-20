require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "my-app-prod",
      script: "./server.js",
      watch: false,
      env: {
        PORT: process.env.PROD_PORT || 3000,
        NODE_ENV: "production",
        DOMAIN: process.env.PROD_DOMAIN || "example.com",
        NEXT_PUBLIC_SSL_ENABLED: process.env.PROD_SSL_ENABLED || "0",
        NEXT_PUBLIC_SSL_PRIVATE_KEY: process.env.PROD_SSL_PRIVATE_KEY || "",
        NEXT_PUBLIC_SSL_FULLCHAIN_KEY: process.env.PROD_SSL_FULLCHAIN_KEY || "",
      },
    },
    {
      name: "my-app-staging",
      script: "./server.js",
      watch: true,
      env: {
        PORT: process.env.STAGING_PORT || 3001,
        NODE_ENV: "staging",
        DOMAIN: process.env.STAGING_DOMAIN || "localhost",
      },
    },
    {
      name: "my-app-dev",
      script: "./server.js",
      watch: true,
      env: {
        PORT: process.env.DEV_PORT || 3002,
        NODE_ENV: "development",
        DOMAIN: process.env.DEV_DOMAIN || "localhost",
      },
    },
  ],
};
