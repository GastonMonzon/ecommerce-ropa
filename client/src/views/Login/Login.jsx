import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../store";
import styles from "./Login.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const googleSignInHandler = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      toast.error("Error al iniciar sesión con Google");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      toast.success("Iniciaste sesión correctamente", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 1000
      });
      setUser({
        email: "",
        password: ""
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <strong>Ingresa tu usuario y contraseña</strong>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          className={styles.input}
          name="email"
          type="email"
          value={user.email}
          placeholder="Email"
          onChange={changeHandler}
        />
        <input
          className={styles.input}
          name="password"
          value={user.password}
          type="password"
          placeholder="Contraseña"
          onChange={changeHandler}
        />
        <span className={styles.span}>¿Olvidaste tu contraseña?</span>
        <button className={styles.button} type="submit">
          Login
        </button>
        <button className={styles.googleButton} onClick={googleSignInHandler}>
          Iniciar sesión con Google
        </button>
        <Link to="/register">
          <span className={styles.span}>¿No tienes cuenta? Registrate</span>
        </Link>
        <ToastContainer />
      </form>
    </div>
  );
}
