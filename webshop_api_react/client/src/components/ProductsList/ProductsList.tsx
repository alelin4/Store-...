import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { StoreContext } from "../../Context-reducer/StoreContext";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: URL;
  inStock: number;
}

function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
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

  const { addToCart } = useContext(StoreContext);

  const handleAdd = (product: Product): void => {
    addToCart(product);
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-4xl text-center font-semibold mt-2 py-4">
            Vårt utbud{" "}
          </h1>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col">
              <Link to={`/${product._id}`}>
                <ProductCard product={product} />
              </Link>
              <div className="mt-4">
                {product.inStock >= 1 && (
                  <AddToCartBtn
                    onClick={() => handleAdd(product)}
                    inStock={product.inStock}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
