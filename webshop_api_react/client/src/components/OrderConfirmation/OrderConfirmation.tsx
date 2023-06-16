import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { orderData, userDetails, total, shippingPrice, products } =
    location.state;
  const totalWithShipping = total + shippingPrice;

  const getProductCount = (productId: unknown) => {
    const count = products.filter(
      (product: { _id: any; }) => product._id === productId
    ).length;
    return count;
  };

  // Simulate an asynchronous operation, e.g., processing order, etc.
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the desired delay
    }, 2000); // Simulated delay of 2 seconds
  }, []);

  return (
    <div className="mb-80 flex flex-row items-center justify-between mt-2 py-6 px-10 text-xl font-medium">
      <div className="p-2 border border-gray-200 rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="confirmation-content">
            <h1 className="text-2xl font-bold mb-4">Orderbekräftelse</h1>
            <p>
              Din beställning har bekräftats. Tack för att du handlat med oss{" "}
              {userDetails.firstName}!
              <p>Ditt ordernummer är: {orderData.orderNumber}.</p>
              <p>
                Du kommer få din order levererad till{" "}
                {orderData.deliveryAddress.street},{" "}
                {orderData.deliveryAddress.zipcode}{" "}
                {orderData.deliveryAddress.city},{" "}
              </p>
              {orderData.deliveryAddress.country}.
            </p>
            {orderData.shippingMethod === "648248d3bbcfe7d8092c84f8" && (
              <p>Din beställning via DHL kommer anlända inom 24 timmar.</p>
            )}
            {orderData.shippingMethod === "648248eabbcfe7d8092c84fa" && (
              <p>Din beställning via Instabox kommer anlända inom 48 timmar.</p>
            )}
            {orderData.shippingMethod === "648253e3bbcfe7d8092c8544" && (
              <p>Din beställning via Postnord kommer anlända inom 72 timmar.</p>
            )}
            <ul>
              <ul>
                {Array.from(
                  new Set(products.map((product: { _id: any; }) => product._id))
                ).map((productId) => {
                  const product = products.find(
                    (product: { _id: unknown; }) => product._id === productId
                  );
                  const count = getProductCount(productId);
                  return (
                    <li key={productId}>
                      <p>
                        Dina beställda produkter: {product.title} - Antal:{" "}
                        {count}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </ul>

            <p>Din totala summa, inklusive frakt är: {totalWithShipping}:-</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
