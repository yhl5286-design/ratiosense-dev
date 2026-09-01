/* serve.mjs — 확인용 정적 서버. 아무것도 캐시하지 않는다.
   `python -m http.server` 는 캐시 헤더를 보내지 않아 브라우저가 옛 파일을 몇 시간씩 붙들고,
   대사·음성을 고쳐도 옛 소리가 그대로 난다. 이 서버는 매번 새로 받게 한다.

   rs-main-deploy 폴더에서:  node v4/_tools/serve.mjs [포트]
   그다음 http://localhost:8777/v4/index.html                                    */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const PORT = Number(process.argv[2]) || 8777;
const ROOT = process.cwd();
const TYPE = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8',   '.json':'application/json; charset=utf-8',
  '.mp3':'audio/mpeg', '.mp4':'video/mp4', '.png':'image/png',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml',
  '.csv':'text/csv; charset=utf-8', '.md':'text/markdown; charset=utf-8',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(url.parse(req.url).pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}).end('없음: ' + p); return; }
    res.writeHead(200, {
      'Content-Type': TYPE[path.extname(file).toLowerCase()] || 'application/octet-stream',
      /* 이 세 줄이 핵심 — 브라우저·중간 캐시가 무엇도 붙들지 않게 한다 */
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    res.end(buf);
  });
}).listen(PORT, () => {
  console.log('캐시 없는 확인용 서버 — http://localhost:' + PORT + '/v4/index.html');
  console.log('멈추려면 Ctrl+C');
});
