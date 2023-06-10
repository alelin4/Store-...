import { useContext } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

function CartDetails() {
  const { products, total } = useContext(StoreContext);
  const isLoggedIn = Cookies.get('token') !== undefined;

  return (
    <div className="p-10 mx-auto px-8 border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold p-5">Varukorg</h1>
      {products.length === 0 ? (
        <p className="text-xl">Din varukorg är tom</p>
      ) : (
        <ul className="mb-4">
          <div>
            <div className="flex flex-row items-center justify-between mt-2 py-6 px-10 text-xl font-medium">
              <h2>Dina Produkter</h2>
              <p> Pris för produkter: {total}:-</p>
            </div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </ul>
      )}
      {products.length > 0 && (
        <Link to={isLoggedIn ? "/checkout" : "/login"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
            {isLoggedIn ? "Till kassan" : "Logga in för att fortsätta"}
          </button>
        </Link>
      )}
    </div>
  );
}

export default CartDetails;
