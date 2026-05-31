interface BoxDiagramProps {
  comprimento: string;
  largura: string;
  altura: string;
}

function parse(s: string): number {
  const n = Number(s.replace(",", "."));
  return n > 0 && Number.isFinite(n) ? n : 0;
}

function label(valor: string, nome: string): string {
  const n = parse(valor);
  return n > 0 ? `${valor.trim()} cm` : nome;
}

const ANGLE_DEG = 28;
const ANGLE_RAD = ANGLE_DEG * Math.PI / 180;
const COS = Math.cos(ANGLE_RAD);
const SIN = Math.sin(ANGLE_RAD);
const DEPTH_SCALE = 0.58; // comprimento parece mais curto na projeção

export default function BoxDiagram({ comprimento, largura, altura }: BoxDiagramProps) {
  const c = parse(comprimento) || 50;
  const l = parse(largura)     || 40;
  const a = parse(altura)      || 30;

  // Dimensões proporcionais em pixels antes do scale
  const fw0 = l;
  const fh0 = a;
  const dd0 = c * DEPTH_SCALE;
  const dx0 = dd0 * COS;
  const dy0 = dd0 * SIN; // positivo = sobe na tela (SVG y inverte mais tarde)

  // Escala para caber em 150×120 px
  const sc = Math.min(150 / (fw0 + dx0), 120 / (fh0 + dy0));
  const fw = fw0 * sc;
  const fh = fh0 * sc;
  const dx = dx0 * sc;
  const dy = dy0 * sc;

  // Margens para cotas e labels
  const ML = 52;  // esquerda  (label Altura)
  const MB = 38;  // baixo     (label Largura)
  const MT = 18;  // cima
  const MR = 68;  // direita   (label Comprimento)

  // Canto frontal inferior-esquerdo
  const ox = ML;
  const oy = MT + dy + fh;

  // 7 pontos visíveis da caixa
  // Frente: A(topo-esq) B(topo-dir) C(baixo-dir) D(baixo-esq)
  // Trás (visíveis): E(topo-esq) F(topo-dir) G(baixo-dir)
  const Ax = ox,      Ay = oy - fh;
  const Bx = ox + fw, By = oy - fh;
  const Cx = ox + fw, Cy = oy;
  const Dx = ox,      Dy = oy;
  const Ex = Ax + dx, Ey = Ay - dy;
  const Fx = Bx + dx, Fy = By - dy;
  const Gx = Cx + dx, Gy = Cy - dy;

  const vw = ML + fw + dx + MR;
  const vh = MT + dy + fh + MB;

  // ── Cotas ──────────────────────────────────────────────────────────────────

  // Altura: linha vertical à esquerda
  const hx = ox - 9;          // x da linha de cota
  const hTick = 7;             // comprimento dos traços horizontais

  // Largura: linha horizontal embaixo
  const wy = oy + 9;           // y da linha de cota
  const wTick = 7;

  // Comprimento: extensão diagonal além dos cantos B e F
  const EXT = 12;              // quantos px além do canto
  const B1x = Bx + EXT * COS, B1y = By - EXT * SIN;  // tick de B
  const F1x = Fx + EXT * COS, F1y = Fy - EXT * SIN;  // tick de F
  // midpoint da cota de comprimento
  const cmx = (B1x + F1x) / 2;
  const cmy = (B1y + F1y) / 2;
  // offset perpendicular para afastar o label da cota (para cima/esq, fora da caixa)
  const LOFF = 11;
  const labCx = cmx - SIN * LOFF;
  const labCy = cmy - COS * LOFF;

  return (
    <svg
      viewBox={`0 0 ${vw.toFixed(1)} ${vh.toFixed(1)}`}
      className="mx-auto h-auto w-full max-w-[280px]"
      role="img"
      aria-label="Diagrama de uma caixa indicando comprimento, largura e altura"
    >
      <defs>
        <marker id="seta-box" viewBox="0 0 10 10" refX="5" refY="5"
          markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Topo */}
      <polygon
        points={`${Ax},${Ay} ${Ex},${Ey} ${Fx},${Fy} ${Bx},${By}`}
        fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Lateral direita */}
      <polygon
        points={`${Bx},${By} ${Fx},${Fy} ${Gx},${Gy} ${Cx},${Cy}`}
        fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Frente */}
      <polygon
        points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy} ${Dx},${Dy}`}
        fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── Linhas de cota ─────────────────────────────────────────────────── */}
      <g stroke="#94a3b8" strokeWidth="1.1">
        {/* Altura: traços + linha vertical */}
        <line x1={ox} y1={Ay} x2={hx - hTick} y2={Ay} />
        <line x1={ox} y1={oy} x2={hx - hTick} y2={oy} />
        <line x1={hx} y1={Ay} x2={hx} y2={oy}
          markerStart="url(#seta-box)" markerEnd="url(#seta-box)" />

        {/* Largura: traços + linha horizontal */}
        <line x1={ox}      y1={oy} x2={ox}      y2={wy + wTick} />
        <line x1={ox + fw} y1={oy} x2={ox + fw} y2={wy + wTick} />
        <line x1={ox} y1={wy} x2={ox + fw} y2={wy}
          markerStart="url(#seta-box)" markerEnd="url(#seta-box)" />

        {/* Comprimento: extensão diagonal + linha com setas */}
        <line x1={Bx} y1={By} x2={B1x} y2={B1y} />
        <line x1={Fx} y1={Fy} x2={F1x} y2={F1y} />
        <line x1={B1x} y1={B1y} x2={F1x} y2={F1y}
          markerStart="url(#seta-box)" markerEnd="url(#seta-box)" />
      </g>

      {/* ── Rótulos ─────────────────────────────────────────────────────────── */}
      <g fill="#475569" fontSize="11" fontWeight={600}>
        {/* Altura: rotacionado 90° à esquerda */}
        <text
          x={hx - hTick - 6}
          y={oy - fh / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90, ${hx - hTick - 6}, ${oy - fh / 2})`}
        >
          {label(altura, "Altura")}
        </text>

        {/* Largura: centralizado embaixo */}
        <text x={ox + fw / 2} y={wy + wTick + 12} textAnchor="middle">
          {label(largura, "Largura")}
        </text>

        {/* Comprimento: paralelo à diagonal, afastado da caixa */}
        <text
          x={labCx}
          y={labCy}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-${ANGLE_DEG}, ${labCx.toFixed(1)}, ${labCy.toFixed(1)})`}
        >
          {label(comprimento, "Compr.")}
        </text>
      </g>
    </svg>
  );
}
