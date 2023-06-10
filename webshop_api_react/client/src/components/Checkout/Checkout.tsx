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
      orderItems: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price * product.quantity,
      })),
      deliveryAddress: {
        street: userDetails.address,
        zipcode: userDetails.zipcode,
        city: userDetails.city,
        country: userDetails.country,
      },
      shippingMethod: userDetails.shippingOption,
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
      <h1 className="text-2xl font-bold mb-4">Kassa</h1>
      <ul className="mb-4">
        <div>
          <div className="flex flex-row items-center justify-between mt-2 py-6 px-3 text-xl font-medium">
            <h2 className="text-2xl font-bold ">Dina produkter</h2>
            <p>Product Price: {total}:-</p>
          </div>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </ul>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className=" p-2 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Levernasinformation</h2>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Namn:
            </label>
            <input
              type="text"
              id="name"
              value={userDetails.name}
              disabled
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              E-post:
            </label>
            <input
              type="email"
              id="email"
              value={userDetails.email}
              disabled
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="address">
              Adress:
            </label>
            <input
              type="text"
              id="address"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="country">
              Land:
            </label>
            <input
              type="text"
              id="country"
              value={userDetails.country}
              onChange={(e) =>
                setUserDetails({ ...userDetails, country: e.target.value })
              }
              className="w-full p-2 border border-gray-300"
            />
          </div>
        </div>
        <div className=" p-2 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Leveransmetod</h2>
          {shippingMethods.map((shippingOption) => (
            <div
              key={shippingOption._id}
              className="border border-gray-200 rounded-lg mb-3 py-3 px-2"
            >
              <input
                type="radio"
                id={shippingOption._id}
                name="shippingOption"
                value={shippingOption._id}
                checked={userDetails.shippingOption === shippingOption._id}
                onChange={handleShippingOptionChange}
              />
              <label htmlFor={shippingOption._id} className="ml-2">
                {shippingOption.company} - {shippingOption.price}:-{" "}
                {shippingOption.deliveryTimeInHours} timmar
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          Tillbaka
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          onClick={placeOrder}
        >
          Lägg bestälning{" "}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
