import { ref } from "vue";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const user = ref(null);

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});

export function useAuth() {
  const register = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    user.value = credential.user;
    return credential;
  };

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    user.value = credential.user;
    return credential;
  };

  const logout = async () => {
    return await signOut(auth);
  };

  return {
    user,
    register,
    login,
    logout,
  };
}
