import { StoreContext } from "../../Context-reducer/StoreContext";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RemoveFromCartBtn from "../RemoveFromCartBtn/RemoveFromCartBtn";

interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: string;
  inStock: number;
  // Add other product properties here
}

function ProductDetails(): JSX.Element {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  const { addToCart, removeFromCart } = useContext(StoreContext);

  const handleAdd = (product: Product): void => {
    addToCart(product);
  };
  const handleRemove = (product: Product): void => {
    removeFromCart(product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        console.log(data);
      } else {
        throw new Error("Error fetching product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-xl">{product.title}</h1>
        <p className="text-lg">{product.description}</p>
        <p className="text-lg">{product.price}</p>
        <p
          className={`text-lg ${
            product.inStock < 1 ? "text-red-500 italic underline" : ""
          }`}
        >
          {product.inStock < 1
            ? "Inte i lager"
            : product.inStock <= 6
            ? "Fåtal i lager"
            : "Finns i lager"}
        </p>
        <img className="object-contain h-48 w-96" src={product.image} alt="" />
        <AddToCartBtn onClick={() => handleAdd(product)} />
        <RemoveFromCartBtn onClick={() => handleRemove(product)} />
      </div>
    </>
  );
}

export default ProductDetails;
