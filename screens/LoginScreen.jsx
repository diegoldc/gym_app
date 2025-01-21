import { getAuth } from "firebase/auth";
import { app } from "../firebase-config";

const auth = getAuth(app);

function LoginScreen() {
  return <div>LoginScreen</div>;
}

export default LoginScreen;
