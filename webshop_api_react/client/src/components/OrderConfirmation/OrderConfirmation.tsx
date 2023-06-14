import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

const ConfirmationPage = () => {
  return (
    <div className=" flex flex-col mb-8 items-center justify-center gap-4 mt-3 py-2">
      <div className="m-5 mb-7 p-5 border border-gray-200 rounded-lg">
        <h2 className="flex flex-col items-center justify-center gap-4 mt-2 py-2 text-2xl font-bold">Orderbekräftelse</h2>
        <p>
          Din beställning har bekräftats. Tack för att du handlat med oss! Order
          id:
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
