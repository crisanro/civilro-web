// src/lib/bunny.js
import crypto from 'crypto';

// Para lecciones y contenido premium
export function generarUrlFirmada(videoId) {
  const libraryId = process.env.BUNNY_LIBRARY_ID; 
  const securityKey = process.env.BUNNY_SECURITY_KEY;
  
  if (!videoId || !libraryId || !securityKey) return null;

  const expiration = Math.floor(Date.now() / 1000) + 3600;
  const hash = crypto.createHash('sha256')
    .update(securityKey + videoId + expiration)
    .digest('hex');

  return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${hash}&expires=${expiration}`;
}

// Para landings, trailers y videos de marketing
export function generarUrlPublica(videoId) {
  const libraryId = process.env.BUNNY_PUBLIC_LIBRARY_ID;
  if (!videoId || !libraryId) return null;
  return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`;
}

// Detecta si es YouTube o Bunny
export function detectarTipoVideo(videoId, esPublico = false) {
  if (!videoId) return null;

  const ytMatch = videoId.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{11})/
  );
  if (ytMatch) return { tipo: 'youtube', id: ytMatch[1] };

  if (esPublico) {
    return { tipo: 'bunny', url: generarUrlPublica(videoId) };
  }
  return { tipo: 'bunny', url: generarUrlFirmada(videoId) };
}