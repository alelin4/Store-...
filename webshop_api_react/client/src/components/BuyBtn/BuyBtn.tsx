import { Link } from "react-router-dom";

function BuyBtn() {
  return (
    <div className="bg-blue-500 w-40 flex items-center justify-center">
      <Link to="/checkout">
        <button>BuyBtn</button>
      </Link>
    </div>
  );
}

export default BuyBtn;
