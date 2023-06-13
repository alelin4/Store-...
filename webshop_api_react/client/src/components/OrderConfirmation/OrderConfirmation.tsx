// ConfirmationPage.tsx
import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

const ConfirmationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate an asynchronous operation, e.g., processing order, etc.
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the desired delay
    }, 2000); // Simulated delay of 2 seconds
  }, []);

  return (
    <div className="flex flex-row items-center justify-between mt-2 py-6 px-10 text-xl font-medium">
      <div className=" p-2 border border-gray-200 rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="confirmation-content">
             <h1 className="text-2xl font-bold mb-4">Orderbekräftelse</h1>
            <p>
              Din beställning har bekräftats. Tack för att du handlat med oss!
              Order id:
            </p>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default ConfirmationPage;
