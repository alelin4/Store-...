import { useContext } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GrCart, GrTrash } from "react-icons/gr";

function CartDetails() {
  const { products, total, addToCart, removeFromCart, removeItemFromCart } =
    useContext<StoreContextValue>(StoreContext);
  const isLoggedIn = Cookies.get("token") !== undefined;

  const getProductCount = (productId: unknown) => {
    const count = products.filter(
      (product: { _id: any }) => product._id === productId
    ).length;
    return count;
  };

  const getProductPrice = (productId: unknown) => {
    const product = products.find(
      (product: { _id: any }) => product._id === productId
    );
    if (product) {
      return product.price * getProductCount(productId);
    }
    return 0;
  };

  const handleAddQuantity = (productId: unknown) => {
    const product = products.find(
      (product: { _id: any }) => product._id === productId
    );
    if (product) {
      addToCart(product);
    }
  };

  const handleRemoveQuantity = (productId: unknown) => {
    const product = products.find(
      (product: { _id: any }) => product._id === productId
    );
    if (product) {
      removeFromCart(product);
    }
  };

  const handleRemoveItem = (productId: unknown) => {
    const filteredProducts = products.filter(
      (product: { _id: any }) => product._id === productId
    );
    filteredProducts.forEach((product: any) => removeItemFromCart(product));
  };

  const getProductName = (productId: unknown) => {
    const product = products.find(
      (product: { _id: any }) => product._id === productId
    );
    return product ? product.title : "";
  };

  return (
    <div className="max-w-4xl pt-9 pb-9 mt-9 mb-80 mx-auto border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center">Varukorg</h1>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-3 py-2">
          <div className="w-86 m-5 mb-8 p-7 center">
            <p className="text-3xl py-6">Din varukorg är tom.</p>
            <div className="w-40 h-40 mx-auto">
              <GrCart size={100} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-3 py-2">
          <div className="w-full max-w-screen-md m-5 mb-2 p-7 border border-gray-200 rounded-lg">
            <div className="text-sm flex flex-row items-center justify-between mt-2 py-1 px-7  md:text-base font-medium">
              <h2 className="">Dina Produkter</h2>
              <p>Pris för produkter: {total}:-</p>
            </div>

            <ul className="mb-4">
              {Array.from(
                new Set(products.map((product: { _id: any }) => product._id))
              ).map((productId) => {
                const product = products.find(
                  (product: { _id: unknown }) => product._id === productId
                );
                return (
                  <li key={product._id} className="p-2 mb-3 mt-3 border-b">
                    <div className="flex items-center mb-3">
                      <button
                        className="px-2 mr-5 text-red-500"
                        onClick={() => handleRemoveQuantity(productId)}
                      >
                        <GrTrash />
                      </button>
                      {product && product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 mr-10"
                        />
                      )}
                      <div className="flex flex-grow">
                        <div className="w-1/3">
                          <h3>{getProductName(productId)}</h3>
                          <h4>{product.price}:-</h4>
                        </div>
                        <div className="w-1/3 flex items-center justify-center">
                          <button
                            className="px-2 border border-gray-400 rounded mr-2"
                            onClick={() => handleRemoveItem(productId)}
                          >
                            -
                          </button>{" "}
                          {getProductCount(productId)}{" "}
                          <button
                            className="px-2 border border-gray-400 rounded ml-2"
                            onClick={() => handleAddQuantity(productId)}
                          >
                            +
                          </button>
                        </div>
                        <div className="w-1/3 text-right">
                          <h4>{getProductPrice(productId)}:-</h4>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {products.length > 0 && (
              <Link to={isLoggedIn ? "/checkout" : "/login"}>
                <button className="mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
                  {isLoggedIn ? "Till kassan" : "Logga in för att fortsätta"}
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartDetails;
