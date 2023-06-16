import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

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

  const { addToCart } = useContext(StoreContext);

  const handleAdd = (product: Product): void => {
    addToCart(product);
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
    <div className=" flex flex-col mb-8 items-center justify-center gap-4 mt-3 py-2">
      <div className="mb-9 max-w-screen-lg m-5 p-7 border border-gray-200 rounded-lg place-items-center">
        <div className="flex flex-row justify-evenly items-center">
          <div className="">
            <img
              className="object-contain h-88 w-96"
              src={product.image}
              alt=""
            />
          </div>

          <div className="space-y-3 text-center">
            <h1 className="text-xl">{product.title}</h1>

            <p className="text-md">{product.price}</p>

            <AddToCartBtn onClick={() => handleAdd(product)}  />

            <p
              className={`text-xs ${
                product.inStock < 1 ? "text-red-500 italic underline" : ""
              }`}
            >
              {product.inStock < 1
                ? "Inte i lager"
                : product.inStock <= 6
                ? "Fåtal i lager"
                : "Finns i lager"}
            </p>
          </div>
        </div>

        <p className="text-l pt-8 pl-3 pr-3">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
