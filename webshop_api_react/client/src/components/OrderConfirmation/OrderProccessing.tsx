import { useEffect } from "react";
import Loader from "../Loader/Loader";

function OrderProcessing() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/order-confirmation"; // Redirect to order-confirmation page
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className=" flex flex-col mb-8 items-center justify-center gap-4 mt-3 py-2">
      <div className="m-5 mb-7 p-5 border border-gray-200 rounded-lg">
        <Loader />
      </div>{" "}
    </div>
  );
}

export default OrderProcessing;
