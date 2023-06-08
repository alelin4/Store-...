import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <ul className="flex list-none gap-2 mr-2">
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
