/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100% estático — pronto para hospedar de graça na Vercel/Netlify.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
