import About from "../About/About";
import Contact from "../Contact/Contact";
import { Routes, Route } from "react-router";
import ProductDetails from "../ProductDetails/ProductDetails";
import Home from "../Home/Home";
import CartDetails from "../CartDetails/CartDetails";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default Main;
