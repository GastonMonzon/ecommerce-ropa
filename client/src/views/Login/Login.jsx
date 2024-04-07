import styles from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { useStore } from "../../store";

const Login = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();
	const setUserInfo = useStore((state) => state.setUserInfo);

	const [user, setUser] = useState({
		email: "",
		password: ""
	});

	/*  const navigate = useNavigate()
  const cookies = new Cookies();
  const setDataUser = useStore((state) => state.setDataUser);
 */

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:3001/auth/login",
				user
			);
			console.log("RESPONSE", response);

			//? Guardando en el estado global la info del usuario
			setUserInfo({
				id: response.data.id,
				name: response.data.name,
				email: response.data.email
			});

			/*   setDataUser(response.data.data)
        cookies.set("token", response.data.token)
      */

			if (response.status === 200) {
				cookies.set("token", response.data.token);

				toast.success("Iniciaste sesión", {
					onClose: () => {
						navigate("/");
					},
					autoClose: 1000
				});

				setUser({
					//Limpia el form
					fullname: "",
					name: "",
					surname: "",
					email: "",
					password: "",
					address: ""
				});
			} else {
				toast.error("Error al iniciar sesión");
			}
		} catch (error) {
			toast.error("Error al iniciar sesión");
		}
	};

	const userInfo = useStore((state) => state.userInfo);
	console.log("USERINFO");
	console.log(userInfo);

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
				<Link to="/register">
					<span className={styles.span}>¿No tienes cuenta? Registrate</span>
				</Link>
				<ToastContainer />
			</form>
		</div>
	);
};

export default Login;
