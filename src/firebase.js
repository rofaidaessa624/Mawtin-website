import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDInU0kY9zKGrXBLVNlURzzxZJd9aPAlnA",
  authDomain: "mawtin-6308b.firebaseapp.com",
  projectId: "mawtin-6308b",
  storageBucket: "mawtin-6308b.appspot.com",
  messagingSenderId: "1057041831387",
  appId: "1:1057041831387:web:67c955845a44a6a02043fe",
};

const app = initializeApp(firebaseConfig);

// 🔔 مهم جدًا
export const messaging = getMessaging(app);

//const app = initializeApp(firebaseConfig);

//export const messaging = getMessaging(app);

/**
 * 🔔 طلب إذن + جلب FCM Token
 */
export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("❌ Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BEoaXVQO23PzX0Xwolj46K80Mwb8JdJuOQ1Dqpkb3WP55Np6Z6uto1O9T_lFiOoASsLCoXVNL4bcpbOR8OyWmFc",
    });

    if (token) {
      console.log("✅ FCM TOKEN:", token);
      return token;
    }

    return null;
  } catch (err) {
    console.log("❌ Error getting token:", err);
    return null;
  }
};

/**
 * 🔔 استقبال الإشعارات أثناء فتح الموقع
 */
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

/**
 * 🔔 Notification UI + Sound + Icon (Foreground)
 */
export const showLocalNotification = (title, body) => {
  const notification = new Notification(title, {
    body,
    icon: "/mawtin-icon.png",
  });

  const audio = new Audio("/notification.mp3");
  audio.play().catch(() => {});
};