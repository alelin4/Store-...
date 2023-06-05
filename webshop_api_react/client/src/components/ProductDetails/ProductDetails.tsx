import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";




interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: URL;
  // Add other product properties here
}

function ProductDetails(): JSX.Element {
  const [product, setProduct] = useState<Product[]>([]);
const {id} = useParams();

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async (): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (response.ok) {
      const data = await response.json();
      setProduct(data);
      console.log(data);
    } else {
      throw new Error('Error fetching products');
    }
  } catch (error) {
    
    console.error(error);
  }
};
return (
  <div className="md:container md:mx-auto ">

<h1>{product.title}</h1>
<p>{product.description}</p>
<p>{product.price}</p>
<img className="object-contain h-48 w-96 ..." src={product.image} alt="" />
<AddToCartBtn/>
  </div>
   
);
}

 
export default ProductDetails;