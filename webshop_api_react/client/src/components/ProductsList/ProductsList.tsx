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
              <AddToCartBtn onClick={() => handleAdd(product)} inStock={product.inStock} />
              
            </div>
          ))}
        </div>


      </div>
    </>
  );
}

export default ProductList;
