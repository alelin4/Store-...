import { Link } from "react-router-dom";
import "./BuyBtn.css";

function BuyBtn() {
  return (
    <div className="buy_btn">
      <Link to="/checkout">
        <button>BuyBtn</button>
      </Link>
    </div>
  );
}

export default BuyBtn;
