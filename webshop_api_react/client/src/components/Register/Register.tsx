import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post("/api/users/register", values);
        console.log(response.data); // Handle successful registration
        setIsRegistered(true); // Set registration status to true
        resetForm();
      } catch (error) {
        console.error("Error registering:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("E-post finns redan registrerad!");
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-3">
      {!isRegistered ? ( // Render the form if not registered
        <div className="m-5 mb-6 p-3 border border-gray-200 rounded-lg">
          <h2 className="flex flex-col items-center justify-center gap-4 mt-4 py-2 text-2xl font-bold mb-4">
            Skapa konto
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="m-5 flex flex-col items-center justify-center gap-4 mt-4 py-2 px-5"
          >
            {errorMessage && (
              <div className="text-red-500 mb-2">{errorMessage}</div>
            )}
            <div>
              <label htmlFor="firstName">Förnamn:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border rounded-lg px-2 py-1 mt-1 w-full"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div>{formik.errors.firstName}</div>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Efternamn:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border rounded-lg px-2 py-1 mt-1 w-full"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div>{formik.errors.lastName}</div>
              )}
            </div>
            <div>
              <label htmlFor="email">E-post:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded-lg px-2 py-1 mt-1 w-full"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Lösenord:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded-lg px-2 py-1 mt-1 w-full"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div>{formik.errors.password}</div>
              )}
            </div>
            <button
              className="bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Registera
            </button>
          </form>
        </div>
      ) : (
        // Render success message if registered
        <div className="m-9 mb-9 p-9 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            Registreringen är klar!
          </h2>
          <p className="text-center mb-7">Tack för att du registrerade dig.</p>
          <Link to={"/"}>
            <p className="text-center bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3">
              Till startsida
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
