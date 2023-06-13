import React, { useContext } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GrCart } from "react-icons/gr";

function CartDetails() {
  const { products, total, addToCart, removeFromCart } =
    useContext(StoreContext);
  const isLoggedIn = Cookies.get("token") !== undefined;

  const getProductCount = (productId) => {
    const count = products.filter(
      (product) => product._id === productId
    ).length;
    return count;
  };

  const getProductPrice = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      return product.price * getProductCount(productId);
    }
    return 0;
  };

  const handleAddQuantity = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleRemoveQuantity = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      removeFromCart(product);
    }
  };

  const handleRemoveItem = (productId) => {
    const filteredProducts = products.filter(
      (product) => product._id === productId
    );
    filteredProducts.forEach((product) => removeFromCart(product));
  };

  return (
    <div className="p-10 mx-auto px-8 border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold p-5">Varukorg</h1>
      {products.length === 0 ? (
        <div>
          <p className="text-xl p-6">Din varukorg är tom.</p>
          <div className="p-6 text-9xl bg-white">
            <GrCart />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row items-center justify-between mt-2 py-6 px-10 text-xl font-medium">
            <h2>Dina Produkter</h2>
            <p> Pris för produkter: {total}:-</p>
          </div>
          <ul className="mb-4">
            {Array.from(new Set(products.map((product) => product._id))).map(
              (productId) => (
                <li key={productId} className="p-2">
                  <p>
                    Product ID: {productId}, Quantity:{" "}
                    <button
                      className="px-2 border border-gray-400 rounded"
                      onClick={() => handleRemoveQuantity(productId)}
                    >
                      -
                    </button>{" "}
                    {getProductCount(productId)}{" "}
                    <button
                      className="px-2 border border-gray-400 rounded"
                      onClick={() => handleAddQuantity(productId)}
                    >
                      +
                    </button>
                    <button
                      className="px-2 ml-2 text-red-500"
                      onClick={() => handleRemoveItem(productId)}
                    >
                      Remove
                    </button>
                  </p>
                  <p>
                    Price: {getProductPrice(productId)}{" "}
                    {/* Assuming the price is in SEK */}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
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
