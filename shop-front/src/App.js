import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ActivationEmail from "./pages/ActivationEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SingleProduct from "./pages/SingleProduct";
import PaymentMethod from "./pages/PaymentMethod";
import { ToastContainer } from 'react-toastify';
import ConfirmCode from "./pages/ConfirmCode";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

function App(props) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/shop" />}/>
                    {/*<Route path="/*" element={<Navigate to="/404" />}/>*/}
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/recover" element={<ForgotPassword/>}/>
                    <Route path="/recover/password" element={<ResetPassword/>}/>
                    <Route path="/recover/code" element={<ConfirmCode/>}/>

                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/order/:id" element={<PaymentMethod />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/shop" element={<Home/>} />
                    <Route path="/cart" element={<Cart />} />

                    <Route path="/activation/email" element={<ActivationEmail />} />
                    <Route path="/404" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer style={{ top: '75px', right: '0' }} autoClose={1500} />
        </>
    );
}

export default App;
