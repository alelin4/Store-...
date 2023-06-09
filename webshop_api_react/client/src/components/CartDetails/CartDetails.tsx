import { useContext } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext"
import ProductCard  from "../ProductCard/ProductCard";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import RemoveFromCartBtn from "../RemoveFromCartBtn/RemoveFromCartBtn"

function CartDetails() {
  const { addToCart, removeFromCart } = useContext(StoreContext);
  

  const handleAdd = (product: Product): void => {
    addToCart(product);
  };

  const handleRemove = (product: Product): void => {
    removeFromCart(product);
  };
  

  const {products, total} = useContext(StoreContext)
  return (
    <div>
    
      <div className="flex flex-row items-center
      justify-between mt-2 py-6 px-10 text-xl font-medium">
      <h2>Dina Produkter</h2>
      <p> Total: Kr{total}</p>
      </div>
      {products.map((product) =>
      <><ProductCard product={product} />
      <AddToCartBtn onClick={() => handleAdd(product)} /> 
      <RemoveFromCartBtn onClick={() => handleRemove(product)}/></>
      )}
      
    
    </div>
  );
}

export default CartDetails;
