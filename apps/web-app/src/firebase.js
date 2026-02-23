import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyBQuCaUyZ966JFzed7AVF7S5NxaPP0Xwj0",
  authDomain: "chat-app-980df.firebaseapp.com",
  projectId: "chat-app-980df",
  storageBucket: "chat-app-980df.firebasestorage.app",
  messagingSenderId: "874218502847",
  appId: "1:874218502847:web:00860e42a636e70626a40a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 0;

export { db, auth, remoteConfig };
