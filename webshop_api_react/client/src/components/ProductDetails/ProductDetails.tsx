import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: string;
  // Add other product properties here
}

function ProductDetails(): JSX.Element {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

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
      <div className="mx-auto px-8 border border-gray-200 rounded-lg">
        <div>
          <h1 className="text-xl">{product.title}</h1>
          <p className="text-lg">{product.description}</p>
          <p className="text-lg">{product.price}</p>
          <img
            className="object-contain h-48 w-96"
            src={product.image}
            alt=""
          />
          <AddToCartBtn />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
