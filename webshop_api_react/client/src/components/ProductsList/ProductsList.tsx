import { StoreContext } from "../../Context-reducer/StoreContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import RemoveFromCartBtn from "../RemoveFromCartBtn/RemoveFromCartBtn";

interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: string; // Change URL to string
  // Add other product properties here
}

function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, removeFromCart } = useContext(StoreContext);

  const handleAdd = (product: Product): void => {
    addToCart(product);
  };

  const handleRemove = (product: Product): void => {
    removeFromCart(product);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } else {
        throw new Error("Error fetching products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-4xl text-center font-semibold mt-2 py-4">
            Nytt hos oss
          </h1>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="max-w-screen-2xl flex flex-col items-center gap-3 lg:grid lg:grid-cols-4 p-8">
          {products.map((product) => (
            <div key={product._id}>
              <Link to={`/${product._id}`}>
                <ProductCard product={product} />
              </Link>
              <AddToCartBtn onClick={() => handleAdd(product)} />
              <RemoveFromCartBtn onClick={() => handleRemove(product)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
