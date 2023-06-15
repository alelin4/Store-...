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
              Din beställning har bekräftats. Tack för att du handlat med oss{" "}
              {userDetails.firstName} ! Ditt order id är:{" "}
              {orderData.orderNumber} och du kommer få din order levererad till{" "}
              {orderData.deliveryAddress.street},{" "}
              {orderData.deliveryAddress.zipcode}{" "}
              {orderData.deliveryAddress.city},{" "}
              {orderData.deliveryAddress.country}.            </p>
      

            
{orderData.shippingMethod === "648248d3bbcfe7d8092c84f8" && <p>Du kommer få din beställning via DHL inom 24Tim</p>}
{orderData.shippingMethod === "648248eabbcfe7d8092c84fa" && <p>Du kommer få din beställning via Instabox inom 48Tim</p>}
{orderData.shippingMethod === "648253e3bbcfe7d8092c8544" && <p>Du kommer få din beställning via Postnord inom 72Tim</p>}


            <p>
              Du kommer få ett kvitto på ditt köp på detta mejladress:{" "}
              {userDetails.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
