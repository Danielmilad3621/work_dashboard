import { serve } from "srvx/node";
import handler from "./dist/server/server.js";

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

serve({
  port,
  hostname,
  fetch: handler.fetch,
});

console.log(`Server listening on http://${hostname}:${port}`);
