import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProductItem from "./pages/ProductItem";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Brand from "./pages/Brand";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin" />} />
                    <Route path="/*" element={<Navigate to="/404" />} />
                    <Route path="/product/:id" element={<ProductItem />} />
                    <Route path="/product" element={<Product/>} />
                    <Route path="/category" element={<Category/>} />
                    <Route path="/brand" element={<Brand/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/admin" element={<Home/>} />
                    <Route path="/order" element={<Orders/>} />
                    <Route path="/user" element={<Users/>} />
                    <Route path="/404" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer style={{ top: '75px', right: '0' }} autoClose={1500} />
        </>
    );
}

export default App;