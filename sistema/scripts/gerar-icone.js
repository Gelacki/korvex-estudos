// Gera build/icon.png (512x512) sem dependências: quadrado arredondado com gradiente e o símbolo ">_".
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const S = 512;
const px = Buffer.alloc(S * S * 4);

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
function sdRoundRect(x, y, cx, cy, hw, hh, r) {
  const qx = Math.abs(x - cx) - hw + r, qy = Math.abs(y - cy) - hh + r;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}
function sdSegment(x, y, ax, ay, bx, by) {
  const pax = x - ax, pay = y - ay, bax = bx - ax, bay = by - ay;
  const h = clamp((pax * bax + pay * bay) / (bax * bax + bay * bay));
  return Math.hypot(pax - bax * h, pay - bay * h);
}
const mix = (a, b, t) => a + (b - a) * t;

for (let y = 0; y < S; y++) {
  for (let x = 0; x < S; x++) {
    const i = (y * S + x) * 4;
    const dFundo = sdRoundRect(x + 0.5, y + 0.5, S / 2, S / 2, 240, 240, 110);
    const aFundo = clamp(0.5 - dFundo);
    if (aFundo <= 0) continue;
    // gradiente diagonal índigo → ciano
    const t = clamp((x + y) / (2 * S));
    let r = mix(79, 34, t), g = mix(70, 211, t), b = mix(229, 238, t);
    // brilho sutil no topo
    const brilho = clamp(1 - y / (S * 0.55)) * 0.10;
    r = mix(r, 255, brilho); g = mix(g, 255, brilho); b = mix(b, 255, brilho);
    // símbolo ">_"
    const w = 34; // meia-espessura do traço
    const dChevron = Math.min(
      sdSegment(x, y, 150, 170, 250, 256),
      sdSegment(x, y, 250, 256, 150, 342)
    ) - w;
    const dUnder = sdSegment(x, y, 290, 342, 372, 342) - w;
    const aSimb = clamp(0.5 - Math.min(dChevron, dUnder));
    r = mix(r, 255, aSimb); g = mix(g, 255, aSimb); b = mix(b, 255, aSimb);
    px[i] = Math.round(r); px[i + 1] = Math.round(g); px[i + 2] = Math.round(b); px[i + 3] = Math.round(aFundo * 255);
  }
}

// ---- codificação PNG ----
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(tipo, dados) {
  const len = Buffer.alloc(4); len.writeUInt32BE(dados.length);
  const td = Buffer.concat([Buffer.from(tipo), dados]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const linhas = Buffer.alloc(S * (S * 4 + 1));
for (let y = 0; y < S; y++) { linhas[y * (S * 4 + 1)] = 0; px.copy(linhas, y * (S * 4 + 1) + 1, y * S * 4, (y + 1) * S * 4); }
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(linhas, { level: 9 })), chunk('IEND', Buffer.alloc(0))
]);
const destino = path.join(__dirname, '..', 'build', 'icon.png');
fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.writeFileSync(destino, png);
console.log('Ícone gerado:', destino);
