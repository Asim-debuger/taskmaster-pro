import http from "http";
import { readFile } from "fs/promises";
import { extname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const server = http.createServer(async (req, res) => {
  let filePath;

  if (req.url === "/") {
    filePath = join(__dirname, "public", "index.html");
  } else if (req.url.startsWith("/src")) {
    filePath = join(__dirname, req.url);
  } else {
    filePath = join(__dirname, "public", req.url);
  }

  try {
    let data = await readFile(filePath);

    // MIME types
    let ext = extname(filePath);
    let type = "text/html";
    if (ext === ".js") type = "application/javascript";
    if (ext === ".css") type = "text/css";
    if (ext === ".json") type = "application/json";

    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end("Not found: " + req.url);
  }
});

server.listen(3000, () =>
  console.log("✅ Taskmaster Pro running at http://localhost:3000")
);
