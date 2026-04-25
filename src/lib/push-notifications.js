// src/lib/push-notifications.js
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./firebase"; // Tu config de firebase.js

export const activatePush = async () => {
  try {
    // 1. Registrar el Service Worker que creamos en public
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    
    // 2. Pedir permiso
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging(app);
      
      // 3. Obtener el Token (VAPID KEY de la consola de Firebase)
      const token = await getToken(messaging, { 
        serviceWorkerRegistration: registration,
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
      });

      if (token) {
        console.log("Token listo para guardar:", token);
        // Aquí haríamos un fetch a tu API para guardar el token en Postgres
        return token;
      }
    }
  } catch (error) {
    console.error("Error activando Push:", error);
  }
};