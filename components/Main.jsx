import { useEffect, useState } from "react";
import {
  Button,
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../firebase-config"; // Asegúrate de importar la configuración de Firebase correctamente
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Main() {
  const insets = useSafeAreaInsets();
  const [users, setUsers] = useState([]); // Estado para guardar los usuarios
  // READ
  useEffect(() => {
    // Función que obtiene la lista de usuarios
    const q = query(
      collection(db, "users"),
      // where("name", "in", ["diego", "Diego"]),
      // where("is_admin", "==", false),
      orderBy("name", "asc"),
    );

    const unsubscribe = onSnapshot(
      q, // Pasamos la query completa
      (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Aquí agregamos todos los datos del usuario
        }));
        setUsers(usersList); // Actualiza el estado con la lista de usuarios
      },
      (error) => {
        console.error("Error al obtener los usuarios: ", error);
      },
    );

    // Limpieza de la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);
  // DELETE
  const eliminarUsuario = (id) => {
    const docRef = doc(db, "users", id);
    deleteDoc(docRef);
  };
  // UPDATE
  const hacerAdmin = (id) => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, {
      is_admin: true,
    });
  };
  // CREATE
  const crearReservaNueva = async (id) => {
    try {
      const newReservation = {
        class_id: "hslAFop2tePdqFVOHUxp",
        date: "4 de febrero de 2025, 10:00:00 a.m. UTC+1",
        user_id: id,
      };
      await addDoc(collection(db, "reservations"), newReservation);
    } catch (error) {
      alert(error.message);
    }
  };

  // Renderiza cada usuario en la lista
  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.id}</Text>
      <Text style={styles.userName}>{item.name}</Text>
      {/* Muestra el nombre del usuario */}
      <Text style={styles.userEmail}>{item.mail}</Text>
      {/* Muestra el email del usuario */}
      <Button
        title="Hacer Admin"
        color={"purple"}
        onPress={() => hacerAdmin(item.id)}
      />
      <Button
        title="Crear Reserva"
        color={"purple"}
        onPress={() => crearReservaNueva(item.id)}
      />
      <Button
        title="Eliminar Usuario"
        color={"purple"}
        onPress={() => eliminarUsuario(item.id)}
      />
    </View>
  );

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text style={styles.title}>Usuarios</Text>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
  },
});
