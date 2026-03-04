importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBLudSWDzq8_frN8BRVTHXJKMih7QnHFN8",
  authDomain: "xantos-pizza-grill.firebaseapp.com",
  projectId: "xantos-pizza-grill",
  storageBucket: "xantos-pizza-grill.firebasestorage.app",
  messagingSenderId: "500986013090",
  appId: "1:500986013090:web:1664fe5fc1f014b62d3efb",
});

const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/icon.png",
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received", payload);

  const notificationTitle = payload.notification?.title || "Ny besked!";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icon.png",
    data: payload.data || {},
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});