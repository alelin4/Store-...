import About from "../About/About";
import Contact from "../Contact/Contact";
import { Routes, Route } from "react-router";
import Home from "../Home/Home";
import CartDetails from "../CartDetails/CartDetails";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";
import Register from "../Login/Register";
import ProductDetails from "../ProductDetails/ProductDetails";

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default Main;
