importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDInU0kY9zKGrXBLVNlURzzxZJd9aPAlnA",
  authDomain: "mawtin-6308b.firebaseapp.com",
  projectId: "mawtin-6308b",
  storageBucket: "mawtin-6308b.appspot.com",
  messagingSenderId: "1057041831387",
  appId: "1:1057041831387:web:67c955845a44a6a02043fe",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || "Notification";
  const options = {
    body: payload?.notification?.body || "",
    icon: '/mawtin-icon.png',
    data: payload?.data || {},
  };

  self.registration.showNotification(title, options);
});