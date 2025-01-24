import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "@react-native-firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.PGV_API_KEY,
  // authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: process.env.PGV_PROJECT_ID,
  storageBucket: process.env.PGV_STORAGE_BUCKET,
  // messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: process.env.PGV_APP_ID,
  // measurementId: "TU_MEASUREMENT_ID",
};

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtén una instancia de Firestore
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
