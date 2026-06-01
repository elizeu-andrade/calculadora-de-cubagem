// Gera public/og.png (1200x630) a partir de um SVG.
// Uso pontual: `npm i -D sharp && node scripts/gen-og.mjs`. O PNG é commitado;
// builds futuros NÃO dependem do sharp (imagem OG estática para `output: export`).
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";

const W = 1200;
const H = 630;
const FONT = "Segoe UI, Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1d4ed8"/>
      <stop offset="0.55" stop-color="#2563eb"/>
      <stop offset="1" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- selo da caixa 3D -->
  <g transform="translate(600 168)">
    <rect x="-70" y="-70" width="140" height="140" rx="32" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
    <g transform="translate(-42 -42) scale(3.5)" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 8 12 3 3 8l9 5 9-5Z"/>
      <path d="M3 8v8l9 5 9-5V8"/>
      <path d="M12 13v8"/>
    </g>
  </g>

  <text x="600" y="370" text-anchor="middle" font-family="${FONT}" font-size="72" font-weight="800" fill="#ffffff">Calculadora de Cubagem</text>

  <text x="600" y="430" text-anchor="middle" font-family="${FONT}" font-size="34" fill="rgba(255,255,255,0.92)">Descubra o peso taxável do seu frete</text>
  <text x="600" y="475" text-anchor="middle" font-family="${FONT}" font-size="34" fill="rgba(255,255,255,0.92)">Correios, aéreo e transportadora</text>

  <g transform="translate(600 540)">
    <rect x="-185" y="-26" width="370" height="52" rx="26" fill="rgba(255,255,255,0.16)"/>
    <text x="0" y="9" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="600" fill="#ffffff">100% grátis e sem cadastro</text>
  </g>
</svg>`;

await mkdir("public", { recursive: true });
const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile("public/og.png", png);
console.log("public/og.png gerado:", png.length, "bytes");
