/** @type {import('next').NextConfig} */
const nextConfig = {
  // En versiones recientes de Next.js se pone así:
  devIndicators: {
    appIsrStatus: false,
  },
  // Si la versión es muy reciente, la clave va aquí:
  experimental: {
     // Si antes te dio error aquí, bórralo de experimental
  },
  // Prueba ponerlo aquí directamente:
  allowedDevOrigins: ['isp-flyer-articles-harbour.trycloudflare.com'],
};

export default nextConfig;