import { useContext, useState } from "react";
import { StoreContext } from "../../Context-reducer/StoreContext";
import ProductCard from "../ProductCard/ProductCard";
import CartDetails from "../CartDetails/CartDetails";

function Checkout() {

  // Assuming the user details and cart items are stored in state
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '',
    country: '',
    shippingOption: ''
  });
  
 

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 15, quantity: 2 },
    { id: 3, name: 'Product 3', price: 20, quantity: 3 }
  ]);

  const handleQuantityChange = (itemId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleAddressChange = e => {
    setUserDetails(prevDetails => ({ ...prevDetails, address: e.target.value }));
  };

  const handleCountryChange = e => {
    setUserDetails(prevDetails => ({ ...prevDetails, country: e.target.value }));
  };

  const handleShippingOptionChange = e => {
    setUserDetails(prevDetails => ({ ...prevDetails, shippingOption: e.target.value }));
  };

  return (  

    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={userDetails.name}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={userDetails.email}
          readOnly
        />
      </div>
      <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
      <ul className="mb-4">
       <CartDetails />
      
      
      </ul>
      <div className="mb-4">
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={userDetails.address}
          onChange={handleAddressChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Country</label>
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={userDetails.country}
          onChange={handleCountryChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Shipping Option</label>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={userDetails.shippingOption}
          onChange={handleShippingOptionChange}
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
