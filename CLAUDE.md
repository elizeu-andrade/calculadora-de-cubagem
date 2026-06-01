# Calculadora de Cubagem

Micro-tool web (client-side, sem backend) que calcula o **peso taxável** de um envio — o maior valor entre o peso físico e o peso cubado — para o usuário cotar frete pelo valor certo. Foco em SEO (ser achado no Google) e hospedagem gratuita.

## Stack

- **Next.js 14** (App Router) com **export estático** (`output: "export"` em `next.config.mjs`) — gera site estático para Vercel/Netlify.
- **TypeScript** + **Tailwind CSS 3**.
- **Vitest** para os testes da lógica pura.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento em http://localhost:3100
npm run build    # build estático -> pasta /out
npm test         # roda os testes (vitest)
npm run lint     # next lint
```

> O dev/start roda na **porta 3100** (preferência do projeto — não usar a 3000).

## Estrutura

```
app/
  layout.tsx          # metadata SEO (pt-BR, Open Graph, Twitter) + JSON-LD (WebApplication + FAQPage); injeta o SiteFooter global
  page.tsx            # monta calculadora + conteúdo SEO (home)
  sitemap.ts          # gera /sitemap.xml (home + artigos + páginas institucionais)
  robots.ts           # gera /robots.txt (libera tudo + aponta o sitemap)
  icon.svg            # favicon (caixa 3D da marca) — file convention do Next
  globals.css         # diretivas do Tailwind
  sobre/page.tsx                  # página "Sobre"
  contato/page.tsx                # página "Contato" (e-mail contato@calculadoradecubagem.com.br)
  politica-de-privacidade/page.tsx# Política de Privacidade (cookies/AdSense/LGPD)
  artigos/page.tsx                # índice dos artigos
  artigos/<slug>/page.tsx         # 1 arquivo por artigo (conteúdo em JSX, usa ArticleLayout)
components/
  CubageCalculator.tsx  # 'use client' — inputs, seleção de modo, estado, recálculo reativo
  ResultCard.tsx        # exibe físico vs. cubado e destaca o vencedor (peso taxável)
  SeoContent.tsx        # texto explicativo + FAQ + links para os artigos (exporta a constante FAQ usada no JSON-LD)
  SiteFooter.tsx        # rodapé global com navegação entre as páginas
  ArticleLayout.tsx     # layout reutilizável de artigo (breadcrumb, datas, JSON-LD Article, CTA, "outros artigos")
lib/
  cubage.ts           # lógica pura: tipos, constantes e funções de cálculo
  seo.ts              # SITE_URL — fonte única da URL canônica
  artigos.ts          # metadados dos artigos (fonte única p/ índice + sitemap)
public/
  og.png              # imagem Open Graph 1200x630 (estática)
scripts/
  gen-og.mjs          # regenera public/og.png a partir de um SVG (ver seção SEO)
__tests__/
  cubage.test.ts      # testes das funções puras
```

## Regra de negócio (em `lib/cubage.ts`)

- **Correios/Aéreo:** `pesoCubado = (C × L × A em cm) ÷ divisor`, divisor padrão **6000**.
- **Rodoviário:** `pesoCubado = volume_m³ × fator`, onde `volume_m³ = (C × L × A em cm) ÷ 1.000.000`, fator padrão **300** kg/m³.
- **Peso taxável:** `max(pesoFisico, pesoCubado)`.
- O divisor/fator é **editável** pelo usuário (transportadoras usam valores diferentes).
- Funções retornam `0` para entradas inválidas (campos vazios, zero ou negativos).

## Convenções

- **Toda lógica de cálculo fica em `lib/cubage.ts`** (funções puras, sem dependência de React) para manter testável. A UI só consome essas funções.
- Componentes em português; identificadores de código em português também (ex.: `comprimento`, `pesoTaxavel`).
- Inputs aceitam vírgula como separador decimal (ver `paraNumero` em `CubageCalculator.tsx`).
- A constante `FAQ` é a fonte única do conteúdo de perguntas frequentes — exibida em `SeoContent` e injetada no JSON-LD de `layout.tsx`. Ao editar a FAQ, ambos refletem automaticamente.

## SEO, domínio e conteúdo

- **Domínio de produção:** `https://www.calculadoradecubagem.com.br` (com `www` é a versão canônica; não-www faz 301 para www). Hospedagem e DNS na **Vercel** (deploy automático no push para `main`).
- **URL canônica centralizada em `lib/seo.ts` (`SITE_URL`)** — consumida por `layout.tsx`, `sitemap.ts` e `robots.ts`. Ao mudar de domínio, altere só esse arquivo.
- **Google Search Console:** verificado como propriedade de domínio via registro TXT no DNS (painel da Vercel → Domains). Sitemap enviado.
- **Imagem Open Graph estática** (`public/og.png`): preferimos PNG estático à geração dinâmica via `next/og`, porque `next/og` (`@vercel/og`) **quebra no build com `output: export` no Windows** (`fileURLToPath` sobre `import.meta.url`). Para regerar após mudar o design: `npm i -D sharp --no-save && node scripts/gen-og.mjs` (o `sharp` é temporário, **não** entra no `package.json`; o PNG é commitado).
- **Artigos:** cada artigo é um `app/artigos/<slug>/page.tsx` (conteúdo em JSX) que usa `ArticleLayout`. Os **metadados** (slug, título, descrição, resumo, datas) ficam em `lib/artigos.ts` — fonte única para o índice (`/artigos`), o JSON-LD e o `sitemap.ts`. **Adicionar um artigo** = criar a pasta/página + uma entrada em `ARTIGOS`; o sitemap e o índice se atualizam sozinhos.
- **Links internos** são intencionais (home → artigos, artigos ↔ artigos, todos com CTA de volta à calculadora) — manter ao editar.

## AdSense (pendente — não implementado ainda)

Decisão: **adiar** a integração até haver tráfego orgânico (sites novos/sem conteúdo são reprovados). Já feito como pré-requisito: páginas Sobre/Contato/Política de Privacidade (esta já com a cláusula de cookies/Google AdSense e LGPD). Quando for implementar: `public/ads.txt`, script do AdSense via `next/script` no `layout.tsx`, componente de unidade de anúncio e banner de consentimento (LGPD/CMP). Evitar blocos colados aos inputs/botões da calculadora (política de cliques acidentais).

## Verificação rápida

Casos de referência (já cobertos nos testes):
- Caixa 50×40×30 cm, Correios (6000) → cubado **10 kg**.
- Mesma caixa, Rodoviário (300) → cubado **18 kg**.
- Peso físico maior que o cubado → taxável usa o peso físico.
