import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db, auth } from "../firebase-config";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "@react-native-firebase/auth";
/* @firebase/auth: Auth (11.2.0):
You are initializing Firebase Auth for React Native without providing
AsyncStorage. Auth state will default to memory persistence and will not
persist between sessions. In order to persist auth state, install the package
"@react-native-async-storage/async-storage" and provide it to
initializeAuth:

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}); */
// const auth = getAuth(app);

export default function LoginScreen() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        mail,
        password,
      );
      console.log(userCredentials);
      const uid = userCredentials.user.uid;
      console.log(uid);
      const userDoc = await getDoc(doc(db, "users", uid));
      console.log(userDoc);
      if (!userDoc.exists()) {
        Alert.alert("el correo o la contraseña no están correctos.");
        console.log("el correo o la contraseña no están correctos.");
        return;
      }
      // navigate a calendario
      Alert.alert("todo ok");
      console.log("todo ok");
    } catch (error) {
      Alert.alert("Error", error);
      console.log("contraseña incorrecta!!");
    }
  };

  return (
    <View>
      <Text>INICIO DE SESIÓN</Text>
      <Text>Correo:</Text>
      <TextInput
        placeholder="correo@correo.com"
        keyboardType="email-address"
        value={mail}
        onChangeText={(text) => setMail(text)}
        style={styles.input}
      />
      <Text>Contraseña:</Text>
      <TextInput
        keyboardType="email-address"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button styles={styles.button} title="Aceptar" onPress={submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "purple",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  button: {
    borderColor: "#fff",
    backgroundColor: "purple",
  },
});
