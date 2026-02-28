// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrders from "./pages/PlaceOrders";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Profile from "./pages/Profile";
import AdminPage from "./pages/AdminPage";





const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:-[7vw] lg:-[9vw]">
      <Navbar />
      <SearchBar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-orders" element={<PlaceOrders />} />
          <Route path="/profile" element={<Profile />} />

          {/* example dynamic route for product id */}
          <Route path="/product/:productId" element={<Product />} />


          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          
          <Route path="/admin" element={<AdminPage />} />
          

          {/* fallback to home (or use a NotFound component) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

export default App;
