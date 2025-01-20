import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

export { app, db };
