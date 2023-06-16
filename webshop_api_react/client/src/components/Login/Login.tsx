import { useReducer, FormEvent, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";

type State = {
  email: string;
  password: string;
  loggedIn: boolean;
  errorMessage: string;
  previousPath: string | null;
};

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_LOGGED_IN"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_PREVIOUS_PATH"; payload: string | null };

const initialState: State = {
  email: "",
  password: "",
  loggedIn: false,
  errorMessage: "",
  previousPath: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_LOGGED_IN":
      return { ...state, loggedIn: action.payload };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_PREVIOUS_PATH":
      return { ...state, previousPath: action.payload };
    default:
      return state;
  }
};

function Logout({ handleLogout }: { handleLogout: () => void }): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4 py-2">
      <h2>Welcome, you are logged in!</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white text-lg font-medium rounded-lg py-1 px-3"
      >
        Logout
      </button>
    </div>
  );
}

function Login(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // Update the handleSubmit function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!state.email || !state.password) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please enter both email and password.",
      });
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });

      if (!response.ok) {
        throw new Error("Wrong email or password");
      }

      dispatch({ type: "SET_LOGGED_IN", payload: true });

      // Store the authentication token or session ID in a cookie
      Cookies.set("token", "YOUR_AUTH_TOKEN_OR_SESSION_ID", { expires: 7 }); // Set an expiration date if desired

      if (state.previousPath === "/cart") {
        // Redirect to the checkout page if coming from the cart
        navigate("/checkout");
      } else {
        // Redirect to the homepage by default
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Wrong email or password. Please try again.",
      });
    }
  };

  const handleLogout = (): void => {
    // Remove the authentication token or session ID cookie
    Cookies.remove("token");
    dispatch({ type: "SET_LOGGED_IN", payload: false });
    navigate("/login");
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch({ type: "SET_LOGGED_IN", payload: true });
    }

    if (location.state?.from) {
      dispatch({ type: "SET_PREVIOUS_PATH", payload: location.state.from });
    }
  }, []);

  if (state.loggedIn) {
    return <Logout handleLogout={handleLogout} />;
  }

  return (
    <div className=" flex flex-col mb-80 items-center justify-center gap-4 mt-3 py-2">
      <div className="m-5 mb-7 p-5 border border-gray-200 rounded-lg">
        <h2 className="flex flex-col items-center justify-center gap-4 mt-2 py-2 text-2xl font-bold">
          Logga in
        </h2>
        <form
          onSubmit={handleSubmit}
          className="m-2 flex flex-col items-center justify-center gap-4 mt-4 py-2 px-5"
        >
          {state.errorMessage && <div>{state.errorMessage}</div>}
          <div>
            <label htmlFor="email" className="block">
              E-post:
            </label>
            <input
              className="border rounded-lg px-2 py-1 mt-1 w-full"
              type="email"
              autoComplete="username"
              id="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              Lösenord:
            </label>
            <input
              className="border rounded-lg px-2 py-1 mt-1 w-full"
              type="password"
              autoComplete="current-password"
              id="password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3"
            >
              Logga in
            </button>
          </div>
          <div>
            <p>
              <Link to={"/register"}>
                <button className="mt-3 bg-white text-blue-600 text-m font-medium rounded-lg py-1">
                  Skapa ett konto{" "}
                </button>
              </Link>
            </p>
          </div>
          <p className="text-red-500 text-center">{state.errorMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
