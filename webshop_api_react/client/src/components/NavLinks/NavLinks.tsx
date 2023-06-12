import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function NavLinks() {
  const token = Cookies.get("token");
  const loggedIn = token ? true : false;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token or session ID cookie
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <ul className="flex list-none gap-2 mr-2">
      <NavLink to="/">
        <li>Våra produkter</li>
      </NavLink>
      {loggedIn ? (
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logga ut
        </li>
      ) : (
        <NavLink to="/login">
          <li>Logga in</li>
        </NavLink>
      )}
      <NavLink to="/contact">
        <li>Kundservice</li>
      </NavLink>
      <NavLink to="/about">
        <li>Om oss</li>
      </NavLink>
    </ul>
  );
}

export default NavLinks;
