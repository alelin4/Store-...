import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context-reducer/StoreContext";
import ProductCard from "../ProductCard/ProductCard";

function Checkout() {
  const [userDetails, setUserDetails] = useState({
    name: "Admin Adminsson",
    email: "admin@admin.se",
    address: "",
    country: "",
    shippingOption: "",
  });

  const navigate = useNavigate();
  const { products, total } = useContext(StoreContext);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [totalWithShipping, setTotalWithShipping] = useState(total);

  useEffect(() => {
    fetch("/api/shippingMethod")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the received data
        setShippingMethods(data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error state if needed
      });
  }, [total]);

  const handleShippingOptionChange = (e) => {
    const selectedShippingOption = shippingMethods.find(
      (option) => option._id === e.target.value
    );

    const shippingPrice = selectedShippingOption
      ? selectedShippingOption.price
      : 0;

    setTotalWithShipping(total + shippingPrice);

    setUserDetails({
      ...userDetails,
      shippingOption: e.target.value,
    });
  };

  const placeOrder = () => {
    // Validate the form fields
    if (
      !userDetails.address ||
      !userDetails.country ||
      !userDetails.shippingOption
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      userDetails,
      products,
      totalWithShipping,
    };

    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response contains the newly created order object
        console.log(data); // Log the response data
        navigate("/order-confirmation"); // Navigate to the Order Confirmation page
      })
      .catch((error) => {
        console.error(error);
        // Handle error state if needed
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="mb-4">
        <div>
          <div className="flex flex-row items-center justify-between mt-2 py-6 px-3 text-xl font-medium">
            <h2 className="text-2xl font-bold ">Dina Produkter</h2>
            <p> Pris för produkter: {total}:-</p>
          </div>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </ul>
      <div className="grid grid-cols-2 gap-4">
      <div className="border border-gray-200 rounded-md p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold pt-3 mb-4">
              Leveransinformation
            </h2>

            <label className="block text-sm font-medium">Namn</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={userDetails.name}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">E-post</label>
            <input
              type="email"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={userDetails.email}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Gata</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Postnummer</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={userDetails.country}
              onChange={(e) =>
                setUserDetails({ ...userDetails, country: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Stad</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={userDetails.country}
              onChange={(e) =>
                setUserDetails({ ...userDetails, country: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Land</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={userDetails.country}
              onChange={(e) =>
                setUserDetails({ ...userDetails, country: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="border border-gray-200 rounded-md p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold pt-3 mb-4">Leveransalternativ</h2>
            {shippingMethods.map((option) => (
              <label
                key={option._id}
                className="flex space-x-2 pt-3 px-4 py-2 mb-2 border border-gray-300 rounded-md"
              >
                <input
                  type="radio"
                  value={option._id}
                  checked={userDetails.shippingOption === option._id}
                  onChange={handleShippingOptionChange}
                  required
                />
                <span>
                  {option.company}, {option.price} kr,{" "}
                  {option.deliveryTimeInHours} timmar
                </span>
              </label>
            ))}
            <h2 className="text-1xl font-semibold pt-3 mb-4">Total summa med frakt: {totalWithShipping}:-</h2>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
