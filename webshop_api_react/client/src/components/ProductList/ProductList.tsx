import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  title: string;
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
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
