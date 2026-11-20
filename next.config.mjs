/** @type {import('next').NextConfig} */
// Static export: the site builds into plain files in /out, so it can be hosted for free
// on Cloudflare Pages (no server needed — orders go out through WhatsApp).
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
};
export default nextConfig;
