import { NavLink } from "react-router-dom";
import "./navLinks.css";
function NavLinks() {
  return (
    <ul>
      <NavLink to="/">
        <li>Våra produkter</li>
      </NavLink>
      <NavLink to="/login">
        <li> Logga in</li>
      </NavLink>
      <NavLink to="/contact">
        <li> Kundservice</li>
      </NavLink>
      <NavLink to="/about">
        <li> Om oss</li>
      </NavLink>
    </ul>
  );
}

export default NavLinks;
