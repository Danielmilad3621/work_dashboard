import { serve } from "srvx/node";
import { serveStatic } from "srvx/static";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import handler from "./dist/server/server.js";

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, "./dist/client");

serve({
  port,
  hostname,
  middleware: [serveStatic({ dir: clientDir })],
  fetch: handler.fetch,
});

console.log(`Server listening on http://${hostname}:${port}`);
