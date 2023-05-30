import NavLinks from "../NavLinks/NavLinks";
import "./Header.css";
import ErrorBoundry from "../../Errorboundry";
import ToCart from "../ToCart/ToCart";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
      <h1>
        Webbshop <span>Grupp 2</span>
      </h1>
      </Link>
      <div>
        <ErrorBoundry>
          <NavLinks />
        </ErrorBoundry>
        <ErrorBoundry>
          <ToCart />
        </ErrorBoundry>
      </div>
    </header>
  );
}

export default Header;
