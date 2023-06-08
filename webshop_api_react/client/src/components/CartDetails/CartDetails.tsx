import { useContext } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext"
import ProductCard  from "../ProductCard/ProductCard";

function CartDetails() {
  const {products, total} = useContext(StoreContext)
  return (
    <div>
      <div className="flex flex-row items-center
      justify-between mt-2 py-6 px-10 text-xl font-medium">
      <h2>Dina Produkter</h2>
      <p> Total: Kr{total}</p>
      </div>
      {products.map((product) =>
      <ProductCard product={product} />
      )}
    </div>
  );
}

export default CartDetails;
