// server.js
import http from "http";
import { readFile } from "fs/promises";
import { extname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// ✅ Use Render's dynamic port or fallback to 3000 locally
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  let filePath;

  // ✅ Default to index.html for root
  if (req.url === "/") {
    filePath = join(__dirname, "public", "index.html");
  } 
  // ✅ Serve /src files (if any)
  else if (req.url.startsWith("/src")) {
    filePath = join(__dirname, req.url);
  } 
  // ✅ Serve other static files from public
  else {
    filePath = join(__dirname, "public", req.url);
  }

  try {
    const data = await readFile(filePath);

    // ✅ Detect file MIME type
    const ext = extname(filePath).toLowerCase();
    let type = "text/html";
    if (ext === ".js") type = "application/javascript";
    else if (ext === ".css") type = "text/css";
    else if (ext === ".json") type = "application/json";
    else if (ext === ".png") type = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") type = "image/jpeg";
    else if (ext === ".svg") type = "image/svg+xml";

    // ✅ Write response
    res.writeHead(200, {
      "Content-Type": type,
      "Access-Control-Allow-Origin": "*" // optional, for API/fetch
    });
    res.end(data);
  } catch (err) {
    // ✅ 404 fallback
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found: " + req.url);
  }
});

// ✅ Listen on Render’s dynamic port
server.listen(PORT, () => {
  console.log(`✅ Taskmaster Pro running at http://localhost:${PORT}`);
});
