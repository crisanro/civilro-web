"use client";
import { useEffect } from 'react';
import { useFcmToken } from '@/hooks/useFcmToken';
import { guardarTokenFCM } from '@/actions/perfil';

export default function FcmHandler({ userEmail }) {
  const token = useFcmToken();

  useEffect(() => {
    if (token && userEmail) {
      // Guardamos el token en la base de datos de Prisma
      guardarTokenFCM(userEmail, token);
    }
  }, [token, userEmail]);

  return null; // No ocupa espacio en el HTML
}