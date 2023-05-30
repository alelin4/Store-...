import { GrCart } from "react-icons/gr";
import "./ToCart.css";
import { Link } from "react-router-dom";

function ToCart() {
  return (
    <div className="cart">
      <p>0</p>
      <Link to="/cart">
        <div className="cart_icon">
          <GrCart />
        </div>
      </Link>
    </div>
  );
}

export default ToCart;
