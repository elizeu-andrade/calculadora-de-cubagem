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

// Área de desenho fixa: a moldura (viewBox) NÃO muda de tamanho.
// O cubo é escalado para preencher esta área mantendo a proporção real C×L×A.
const AREA_W = 150;
const AREA_H = 120;

// Margens fixas para cotas e labels (mantêm a moldura estática)
const ML = 52;  // esquerda  (label Altura)
const MB = 38;  // baixo     (label Largura)
const MT = 30;  // cima      (espaço p/ a cota de Comprimento fora da caixa)
const MR = 68;  // direita   (label Comprimento)

// viewBox constante — o módulo é estático
const vw = ML + AREA_W + MR;
const vh = MT + AREA_H + MB;

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

  // Footprint da projeção (largura/altura do bounding box do cubo)
  const fpw = fw0 + dx0;
  const fph = fh0 + dy0;

  // Escala para PREENCHER a área fixa mantendo a proporção real
  const sc = Math.min(AREA_W / fpw, AREA_H / fph);
  const fw = fw0 * sc;
  const fh = fh0 * sc;
  const dx = dx0 * sc;
  const dy = dy0 * sc;

  // Bounding box do cubo já escalado
  const bw = fpw * sc;
  const bh = fph * sc;

  // Canto frontal inferior-esquerdo — cubo centralizado na área fixa
  const ox = ML + (AREA_W - bw) / 2;
  const oy = MT + (AREA_H + bh) / 2;

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

  // ── Cotas ──────────────────────────────────────────────────────────────────

  // Altura: linha vertical à esquerda
  const hx = ox - 9;          // x da linha de cota
  const hTick = 7;             // comprimento dos traços horizontais

  // Largura: linha horizontal embaixo
  const wy = oy + 9;           // y da linha de cota
  const wTick = 7;

  // Comprimento: cota FORA da caixa, paralela à aresta de profundidade B–F,
  // deslocada para cima/esquerda e ligada aos vértices por linhas de extensão.
  const PNX = -SIN, PNY = -COS;   // perpendicular à profundidade, apontando p/ fora (cima-esq)
  const COFF = 15;                // afastamento da linha de cota em relação à aresta
  const COVS = 3;                 // quanto a linha de extensão passa além da cota
  const CGAP = 2;                 // folga entre o vértice e o início da linha de extensão
  // Linha de cota (paralela a B–F, deslocada para fora)
  const Bcx = Bx + PNX * COFF, Bcy = By + PNY * COFF;
  const Fcx = Fx + PNX * COFF, Fcy = Fy + PNY * COFF;
  // Linhas de extensão (dos vértices B e F até um pouco além da cota)
  const Bex0 = Bx + PNX * CGAP, Bey0 = By + PNY * CGAP;
  const Bex1 = Bx + PNX * (COFF + COVS), Bey1 = By + PNY * (COFF + COVS);
  const Fex0 = Fx + PNX * CGAP, Fey0 = Fy + PNY * CGAP;
  const Fex1 = Fx + PNX * (COFF + COVS), Fey1 = Fy + PNY * (COFF + COVS);
  // Rótulo acima da linha de cota
  const cmx = (Bcx + Fcx) / 2;
  const cmy = (Bcy + Fcy) / 2;
  const LOFF = 10;
  const labCx = cmx + PNX * LOFF;
  const labCy = cmy + PNY * LOFF;

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

        {/* Comprimento: linhas de extensão dos vértices + cota fora da caixa */}
        <line x1={Bex0} y1={Bey0} x2={Bex1} y2={Bey1} />
        <line x1={Fex0} y1={Fey0} x2={Fex1} y2={Fey1} />
        <line x1={Bcx} y1={Bcy} x2={Fcx} y2={Fcy}
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
