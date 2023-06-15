import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";





const ConfirmationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { orderData, userDetails } = location.state;


  // Simulate an asynchronous operation, e.g., processing order, etc.
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the desired delay
    }, 2000); // Simulated delay of 2 seconds
  }, []);

  return (
    
    <div className="flex flex-row items-center justify-between mt-2 py-6 px-10 text-xl font-medium">
      <div className="p-2 border border-gray-200 rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="confirmation-content">
            <h1 className="text-2xl font-bold mb-4">Orderbekräftelse</h1>
            <p>
              Din beställning har bekräftats. Tack för att du handlat med oss!
              Order id: {orderData.orderNumber}
            </p>

            <h2>Order Items</h2>
            <ul>
              {orderData.orderItems.map((item: any, index: number) => (
                <li key={index}>
                  <p>Product: {item.product}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </li>
              ))}
            </ul>
            <h2>User Details</h2>
            <ul>
              <li>
                <p>First Name: {userDetails.firstName}</p>
                <p>Last Name: {userDetails.lastName}</p>
                <p>Email: {userDetails.email}</p>
              </li>
            </ul>

            <p>Shipping Method: {orderData.shippingMethod}</p>
            <p>
              Delivery Address: {orderData.deliveryAddress.street},{" "}
              {orderData.deliveryAddress.zipcode}{" "}
              {orderData.deliveryAddress.city}, {orderData.deliveryAddress.country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
