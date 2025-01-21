import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase-config";
import { Text, Form, Button, View, Container } from "react-native-web";
import functions from "firebase/functions";

export function Admin() {
  const auth = getAuth(app);

  async function submitHandler(e) {
    e.preventDefault();
    const mail = e.target.formBasicEmail.value;
    const password = "khb8jGVF45yuio2";
    const user = await createUserWithEmailAndPassword(auth, mail, password);
  }

  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo:</Form.Label>;
          <Form.Control type="email" placeholder="correo@correo.com" />
        </Form.Group>
        <Button type="submit" />
      </Form>
    </Container>
  );
}
