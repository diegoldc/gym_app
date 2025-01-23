import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../firebase-config";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { doc, setDoc, collection } from "firebase/firestore";

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export default function Admin() {
  const auth = getAuth(app);
  const [newEmail, setNewEmail] = useState("");

  async function submitHandler() {
    try {
      const password = "khb8jGVF45yuio2"; // Contraseña por defecto
      const user = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        password,
      );
      const uid = user.user.uid;
      let newUser = {
        userId: uid,
        creditos_calistenia: 4,
        creditos_gratis: 2,
        creditos_libre: 4,
        is_admin: false,
        name: "nombre",
        picture: "pic",
        plan: "plan",
      };
      await setDoc(doc(db, "users", uid), newUser);
      Alert.alert("Usuario creado", `Usuario creado con correo: ${newEmail}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Correo:</Text>
      <TextInput
        placeholder="correo@correo.com"
        keyboardType="email-address"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
        style={styles.input}
      />
      <Button
        styles={styles.button}
        title="Crear Usuario"
        onPress={submitHandler}
      />
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
