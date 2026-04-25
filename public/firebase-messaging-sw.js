importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyASkeGedxXzLH7arkBnqE-xkFvVDMn57SA",
  authDomain: "civilro-963.firebaseapp.com",
  projectId: "civilro-963",
  storageBucket: "civilro-963.firebasestorage.app",
  messagingSenderId: "9982104373",
  appId: "1:9982104373:web:933d8d93be3a0dcb6b327c"
});

const messaging = firebase.messaging();

// Este evento se dispara cuando llega una notificación y la web está en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Notificación en segundo plano recibida:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico', // Puedes poner un logo de CivilRo aquí
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});