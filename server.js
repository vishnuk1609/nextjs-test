const { createServer } = require("http");
const https = require("https");
const fs = require("fs");
const { parse } = require("url");
require("dotenv").config();
const next = require("next");

const env = process.env.NODE_ENV || "development";
const dev = env === "development";
const app = next({ dev });
const handle = app.getRequestHandler();

let useHttps = false;
let options = {};

if (env === "production" && process.env.NEXT_PUBLIC_SSL_ENABLED === "1") {
  const privateKeyPath = process.env.NEXT_PUBLIC_SSL_PRIVATE_KEY;
  const fullChainPath = process.env.NEXT_PUBLIC_SSL_FULLCHAIN_KEY;

  if (privateKeyPath && fullChainPath) {
    try {
      options = {
        key: fs.readFileSync(privateKeyPath, "utf8"),
        cert: fs.readFileSync(fullChainPath, "utf8"),
      };
      useHttps = true;
    } catch (error) {
      console.warn("Failed to read SSL files:", error.message);
      console.warn("Falling back to HTTP.");
    }
  } else {
    console.warn(
      "SSL is enabled but key paths are not properly configured. Falling back to HTTP."
    );
  }
}

const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || "localhost";

app.prepare().then(() => {
  const serverHandler = (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  };

  let server;
  if (useHttps) {
    server = https.createServer(options, serverHandler);
    console.log("Starting server with HTTPS");
  } else {
    server = createServer(serverHandler);
    console.log("Starting server with HTTP");
  }

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Ready on ${useHttps ? "https" : "http"}://${domain}:${port} [${env}]`
    );
  });
});
