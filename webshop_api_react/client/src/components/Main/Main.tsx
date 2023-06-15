import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";
import { Routes, Route } from "react-router";
import ProductDetails from "../Product/ProductDetails/ProductDetails";
import Home from "../../pages/Home/Home";
import CartDetails from "../Cart/CartDetails/CartDetails";
import Checkout from "../Checkout/Checkout";
import Login from "../../pages/Login/Login";
import OrderConfirmation from "../../pages/OrderConfirmation/OrderConfirmation";
import Register from "../../pages/Login/Register";
import OrderProcessing from "../../pages/OrderConfirmation/OrderProccessing";

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
        <Route path="/order-proccessing" element={<OrderProcessing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default Main;
