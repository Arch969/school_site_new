import { createReadStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testPagesRoot = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.dirname(testPagesRoot);
const mediaRoot = path.join(siteRoot, "media");
const selectionFile = path.join(testPagesRoot, "выбор.txt");
const port = Number(process.env.PORT || 5177);

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"]
]);

function send(res, status, body, type = "text/plain; charset=utf-8"){
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

async function readBody(req){
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function resolveStaticPath(urlPath){
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = decoded === "/" ? "/index.html" : decoded;

  if(cleanPath.startsWith("/media/")){
    const target = path.normalize(path.join(mediaRoot, cleanPath.slice("/media/".length)));
    if(target.startsWith(mediaRoot)) return target;
    return null;
  }

  const target = path.normalize(path.join(testPagesRoot, cleanPath));
  if(target.startsWith(testPagesRoot)) return target;
  return null;
}

const server = createServer(async (req, res) => {
  try{
    if(req.method === "POST" && req.url === "/save-selection"){
      const body = await readBody(req);
      const data = JSON.parse(body || "{}");
      const text = typeof data.text === "string" ? data.text : "";

      await mkdir(testPagesRoot, { recursive:true });
      await writeFile(selectionFile, text, "utf8");
      send(res, 200, JSON.stringify({ ok:true, file:"выбор.txt" }), "application/json; charset=utf-8");
      return;
    }

    if(req.method !== "GET"){
      send(res, 405, "Method not allowed");
      return;
    }

    const filePath = resolveStaticPath(req.url || "/");
    if(!filePath){
      send(res, 403, "Forbidden");
      return;
    }

    const fileInfo = await stat(filePath).catch(() => null);
    if(!fileInfo?.isFile()){
      send(res, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mime.get(ext) || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    createReadStream(filePath).pipe(res);
  }catch(error){
    send(res, 500, String(error?.message || error));
  }
});

server.listen(port, () => {
  console.log(`Hero chooser: http://localhost:${port}/`);
  console.log(`Selection file: ${selectionFile}`);
});
