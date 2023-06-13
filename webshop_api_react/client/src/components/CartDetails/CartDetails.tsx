import { useContext } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GrCart, GrTrash } from "react-icons/gr";
import { Key } from "react";




function CartDetails() {
  const { products, total, addToCart, removeFromCart } =
    useContext(StoreContext);
  const isLoggedIn = Cookies.get("token") !== undefined;

  const getProductCount = (productId:string) => {
    const count = products.filter(
      (product: { _id: string; }) => product._id === productId
    ).length;
    return count;
  };

  const getProductPrice = (productId: unknown) => {
    const product = products.find((product: { _id: any; }) => product._id === productId);
    if (product) {
      return product.price * getProductCount(productId);
    }
    return 0;
  };

  const handleAddQuantity = (productId: unknown) => {
    const product = products.find((product: { _id: any; }) => product._id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleRemoveQuantity = (productId: unknown) => {
    const product = products.find((product: { _id: any; }) => product._id === productId);
    if (product) {
      removeFromCart(product);
    }
  };

  const handleRemoveItem = (productId: unknown) => {
    const filteredProducts = products.filter(
      (product: { _id: any; }) => product._id === productId
    );
    filteredProducts.forEach((product: any) => removeFromCart(product));
  };
  const getProductName = (productId: unknown) => {
    const product = products.find((product: { _id: any; }) => product._id === productId);
    return product ? product.title : "";
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
            {Array.from(new Set(products.map((product: { _id: any; }) => product._id))).map(
              (productId) => {
                const product = products.find(
                  (product: { _id: unknown; }) => product._id === productId
                );
                return (
                  <li key={productId as Key} className="p-2">
                    <div className="flex items-center">
                      {product && product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 mr-4"
                        />
                      )}
                      <div>
                        <p>
                          <h3>{getProductName(productId)}</h3>
                          <h4>Price: {getProductPrice(productId)} </h4>
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
                            <GrTrash />
                          </button>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              }
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
