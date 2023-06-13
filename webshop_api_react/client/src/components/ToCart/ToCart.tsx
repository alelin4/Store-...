import { useContext } from "react";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context-reducer/StoreContext";

function ToCart() {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    // Handle case where StoreContext value is null
    return null;
  }

  const { products } = storeContext;

  return (
    <div className="relative">
      <span className="absolute right-[-5px] top-[-5px] bg-gray-300 h-4 w-4 rounded-full flex items-center justify-center text-gray-800">
        {products.length}
      </span>
      <Link to="/cart">
        <div className="text-3xl bg-white">
          <GrCart />
        </div>
      </Link>
    </div>
  );
}

export default ToCart;
