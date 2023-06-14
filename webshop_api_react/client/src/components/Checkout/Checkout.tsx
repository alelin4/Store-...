import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext, Product } from "../../Context-reducer/StoreContext";
import { GrTrash } from "react-icons/gr";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
  shippingOption: string;
}
interface ShippingMethod {
  _id: string;
  company: string;
  price: number;
  deliveryTimeInHours: number;
}
function Checkout() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipcode: "",
    city: "",
    country: "",
    shippingOption: "",
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({}); // Track form validation errors
  const navigate = useNavigate();
  const { products, total, addToCart, removeFromCart, removeItemFromCart } = useContext(StoreContext);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
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
      });
  }, [total]);


  const handleShippingOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    const errors: Partial<UserDetails> = {};
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
  const placeOrder = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
  
    const orderItems = products.map((product: Product) => ({
      product: product._id,
      quantity: getProductCount(product._id), // Get the quantity of the product
      price: product.price * getProductCount(product._id),
    }));
  
    const orderData = {
      orderItems: orderItems,
      deliveryAddress: {
        street: userDetails.street,
        zipcode: userDetails.zipcode,
        city: userDetails.city,
        country: userDetails.country,
      },
      shippingMethod: userDetails.shippingOption,
    };
  
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      console.log(orderData);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response data
  
        // Clear cart items from local storage
        localStorage.removeItem("cartItem");
  
        navigate("/order-proccessing"); // Navigate to the Order Confirmation page
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    // Fetch user details from MongoDB when the component mounts
    fetch("/api/users/authorize")
      .then((response) => response.json())

      .then((data) => {
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,

          firstName: data.firstName,

          lastName: data.lastName,

          email: data.email,
        }));
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);
  const totalProductPrice = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      return product.price * getProductCount(productId);
    }
    return 0;
  };
  const getProductPrice = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      return product.price * getProductCount(productId);
    }
    return 0;
  };
  const getProductCount = (productId) => {
    const count = products.filter(
      (product) => product._id === productId
    ).length;
    return count;
  };
  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.title : "";
  };
  const handleRemoveQuantity = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      removeFromCart(product);
    }
  };
  const handleAddQuantity = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      addToCart(product);
    }
  };
  const handleRemoveItem = (productId) => {
    const filteredProducts = products.filter(
      (product) => product._id === productId
    );
    filteredProducts.forEach((product) => removeItemFromCart(product));
  };
  return (
    <div className="max-w-5xl	p-6 pt-9 pb-9 mt-9 mb-9 mx-auto border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold  text-center ">Kassa</h1>
      <ul className="mb-4">
        <div>
          <div className="flex flex-row items-center justify-between mt-2 py-6 px-10 text-xl font-medium">
            <h2>Dina Produkter</h2>
            <p> Pris för produkter: {total}:-</p>
          </div>
          <ul className="mb-4">
            {Array.from(new Set(products.map((product) => product._id))).map(
              (productId) => {
                const product = products.find((p) => p._id === productId);
                return (
                  <li key={productId} className="p-2 mb-3 mt-3 border-b">
                    <div className="flex items-center">
                      <button
                        className="px-2 ml-7 mr-7"
                        onClick={() => handleRemoveQuantity(productId)}
                      >
                        <GrTrash />
                      </button>
                      {product && product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 mr-8"
                        />
                      )}
                      <div className="mr-9">
                      
                          <h3>{getProductName(productId)}</h3>
                          <h4>{product.price}:-</h4>
                        </div><div className="ml-9 mr-2">
                          <button
                            className="px-2 border border-gray-400 rounded mr-2"
                            onClick={() => handleRemoveItem(productId)}
                          >
                            -
                          </button>{" "}
                          {getProductCount(productId)}{" "}
                          <button
                            className="px-2 border border-gray-400 rounded ml-2 mr-9"
                            onClick={() => handleAddQuantity(productId)}
                          >
                            +
                          </button></div>
                          <div>{getProductPrice(productId)}:-</div>
                        
                      </div>
                   
                  </li>
                );
              }
            )}
          </ul>
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
              value={`${userDetails.firstName} ${userDetails.lastName}`}
              disabled
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="m-2 mb-4">
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
