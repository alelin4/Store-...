import { StoreContext } from '../../Context-reducer/StoreContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import AddToCartButton from '../AddToCartBtn/AddToCartBtn';

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
  const { addToCart } = useContext(StoreContext);

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

  const handleAdd = (product: Product): void => {
    addToCart(product);
  };

  return (
    <>
      <div>
        <h1 className="text-4xl text-center font-semibold mt-2 py-4">Nytt hos oss</h1>
      </div>
      <div className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-3">
        {products.map((product) => (
          <div key={product._id}>
            <Link to={`/${product._id}`}>
              <ProductCard product={product} />
            </Link>
            <AddToCartButton onClick={() => handleAdd(product)} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
