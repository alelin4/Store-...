import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';

 interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: URL;
  // Add other product properties here
}
function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } else {
        throw new Error('Error fetching products');
      }
    } catch (error) {
      
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product._id}>
          <Link key={product._id} to={`/${product._id}`}>
          <ProductCard product={product}/>
         </Link>
        </div>
      ))}
    </div>
  );
}
export default ProductList;
