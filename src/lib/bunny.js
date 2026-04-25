// src/lib/bunny.js
import crypto from 'crypto';

export function generarUrlFirmada(videoId) {
  // Estos datos te los da Bunny.net en la sección "API" de tu Stream Library
  const libraryId = process.env.BUNNY_LIBRARY_ID; 
  const securityKey = process.env.BUNNY_SECURITY_KEY; // ¡Mantenla secreta en tu .env.local!
  
  if (!videoId || !libraryId || !securityKey) return null;

  // 1. Definimos la expiración (Tiempo actual + 3600 segundos = 1 hora)
  const expiration = Math.floor(Date.now() / 1000) + 3600;

  // 2. Creamos la firma encriptada (SHA256) combinando tu llave, el ID del video y la expiración
  const hash = crypto.createHash('sha256')
    .update(securityKey + videoId + expiration)
    .digest('hex');

  // 3. Devolvemos la URL del iFrame lista y blindada
  return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${hash}&expires=${expiration}`;
}