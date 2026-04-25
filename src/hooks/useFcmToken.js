"use client";
import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// Importamos la app ya inicializada de tu archivo de librería
import app from '@/lib/firebase'; 

export const useFcmToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // 1. Verificamos que estemos en el navegador y que las notificaciones existan
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const messaging = getMessaging(app);

    const retrieveToken = async () => {
      try {
        // 2. Pedir permiso al usuario
        const status = await Notification.requestPermission();
        
        if (status === 'granted') {
          // 3. Obtener el token usando la VAPID KEY del .env
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
          });

          if (currentToken) {
            setToken(currentToken);
            console.log("FCM Token generado con éxito.");
          } else {
            console.warn("No se pudo obtener el token. Revisa los permisos.");
          }
        }
      } catch (error) {
        // Este error suele dar si el service worker no está en /public o falta la VAPID key
        console.error('Error al obtener token FCM:', error);
      }
    };

    retrieveToken();

    // 4. Listener para mensajes cuando la pestaña está ABIERTA
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Notificación en primer plano:', payload);
      // Aquí puedes usar un toast de Sonner o un alert
      alert(`${payload.notification.title}\n${payload.notification.body}`);
    });

    return () => unsubscribe(); // Limpiamos el listener al desmontar
  }, []);

  return token;
};