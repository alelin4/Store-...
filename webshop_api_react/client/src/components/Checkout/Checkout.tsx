import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context-reducer/StoreContext";
import ProductCard from "../ProductCard/ProductCard";

function Checkout() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    street: "",
    zipcode: "",
    city: "",
    country: "",
    shippingOption: "",
  });
  const [errors, setErrors] = useState({}); // Track form validation errors

  const navigate = useNavigate();
  const { products, total } = useContext(StoreContext);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(0);
  const totalWithShipping = total + shippingPrice;

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

    const price = selectedShippingOption ? selectedShippingOption.price : 0;

    setShippingPrice(price);

    setUserDetails({
      ...userDetails,
      shippingOption: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {street, zipcode, city, country, shippingOption};

    if (!userDetails.street) {
      errors.street = "Vänligen ange en gatuadress.";
      isValid = false;
    }

    if (!userDetails.zipcode) {
      errors.zipcode = "Vänligen ange ett postnummer.";
      isValid = false;
    }

    if (!userDetails.city) {
      errors.city = "Vänligen ange en stad.";
      isValid = false;
    }

    if (!userDetails.country) {
      errors.country = "Vänligen ange ett land.";
      isValid = false;
    }

    if (!userDetails.shippingOption) {
      errors.shippingOption = "Vänligen välj en leveransmetod.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const placeOrder = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const orderData = {
      orderItems: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price * product.quantity,
      })),
      deliveryAddress: {
        street: userDetails.street,
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
            <p>Pris för produkter: {total}:-</p>
          </div>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </ul>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className=" p-2 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-bold m-2 mb-4">Leveransinformation</h2>
          <div className="mb-4 m-2">
            <label className="block mb-2" htmlFor="name">
              Namn:
            </label>
            <input
              type="text"
              id="name"
              value={userDetails.name}
              disabled
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div className=" m-2 mb-4">
            <label className="block mb-2" htmlFor="email">
              E-post:
            </label>
            <input
              type="email"
              id="email"
              value={userDetails.email}
              disabled
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div className=" m-2 mb-4">
            <label className="block mb-2" htmlFor="street">
              Adress:
            </label>
            <input
              type="text"
              id="street"
              value={userDetails.street}
              onChange={(e) =>
                setUserDetails({ ...userDetails, street: e.target.value })
              }
              className={`w-full p-2 border border-gray-200 rounded-lg ${
                errors.street ? "border-red-500" : ""
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street}</p>
            )}
          </div>
          <div className=" m-2 mb-4">
            <label className="block mb-2" htmlFor="zipcode">
              Postnummer:
            </label>
            <input
              type="text"
              id="zipcode"
              value={userDetails.zipcode}
              onChange={(e) =>
                setUserDetails({ ...userDetails, zipcode: e.target.value })
              }
              className={`w-full p-2 border border-gray-200 rounded-lg ${
                errors.zipcode ? "border-red-500" : ""
              }`}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode}</p>
            )}
          </div>
          <div className=" m-2 mb-4">
            <label className="block mb-2" htmlFor="city">
              Stad:
            </label>
            <input
              type="text"
              id="city"
              value={userDetails.city}
              onChange={(e) =>
                setUserDetails({ ...userDetails, city: e.target.value })
              }
              className={`w-full p-2 border border-gray-200 rounded-lg ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
          <div className=" m-2 mb-4">
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
              className={`w-full p-2 border border-gray-200 rounded-lg ${
                errors.country ? "border-red-500" : ""
              }`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </div>
        <div className=" p-2 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-bold m-2 mb-4">Leveransmetod</h2>
          {shippingMethods.map((shippingOption) => (
            <div
              key={shippingOption._id}
              className="border border-gray-200 rounded-lg mb-3 py-3 px-2 m-2 mb-4"
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
                {shippingOption.company} - {shippingOption.price}:- ({""}
                {shippingOption.deliveryTimeInHours} timmar)
              </label>
            </div>
          ))}
          {errors.shippingOption && (
            <p className="text-red-500 text-sm">{errors.shippingOption}</p>
          )}
          <div className="flex flex-row items-center justify-between mt-2 px-3 text-xl font-medium">
            <p className="p-1 mb-1">Pris för produkter:</p>
            <p>{total}:-</p>
          </div>
          <div className="flex flex-row items-center justify-between mt-2 px-3 text-xl font-medium">
            <p className="p-1 mb-1">Frakt:</p>
            <p>{shippingPrice}:-</p>
          </div>
          <div className="flex flex-row items-center justify-between mt-2 px-3 text-xl font-medium">
            <p className="p-1 mb-2">Total summa:</p>
            <p>{totalWithShipping}:-</p>
          </div>
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
