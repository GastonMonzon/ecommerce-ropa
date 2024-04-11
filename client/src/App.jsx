import { Route, Routes } from "react-router-dom";
import { Home, Form, FormEdit, Login, Register } from "./views";
import Nav from "./components/Nav/Nav";
import { useEffect } from "react";
import { useStore } from "./store.js";
import Detail from "./views/Detail/Detail.jsx";
import Tienda from "./views/Tienda/Tienda.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Carrito from "./components/Carrito/Carrito";
import CheckoutSuccess from "./views/CheckoutSuccess/CheckoutSuccess.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";
import UserDashboard from "./views/UserDashboard/UserDashboard.jsx";
import { autoLogin } from './utils/autoLogin.js'

export default function App() {
  const getAllProducts = useStore((state) => state.getAllProducts);
  const getProductInfo = useStore((state) => state.getProductInfo);
  const getDestacados = useStore((state) => state.getDestacados);
  const getNuevos = useStore((state) => state.getNuevos);
  const getOfertas = useStore((state) => state.getOfertas);
  const getTendencia = useStore((state) => state.getTendencia);
  const userInfo = useStore((state) => state.userInfo);

  const getUserById = useStore((state) => state.getUserById);
  
  useEffect(() => {
    (async function loadData() {
      try {
        await getAllProducts();
        await getProductInfo();
        await getDestacados();
        await getNuevos();
        await getOfertas();
        await getTendencia();
      } catch (error) {
        console.error();
      }
    })();
  });

  useEffect(() => {
    (async function loadUserData() {
      await autoLogin(userInfo, getUserById)
    }())
  });

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<Form />} />
        <Route path="/editproduct/:id" element={<FormEdit />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/:id" element={<Detail />} />
        {userInfo && <Route path="/usuario" element={<UserDashboard />} />}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
