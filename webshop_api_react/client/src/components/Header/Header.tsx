import ErrorBoundry from "../../Errorboundry";
import NavLinks from "../NavLinks/NavLinks";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="h-20 bg-gray-900 flex items-center justify-between px-16 text-gray-300">
      <Link to="/">
        <h1 className="font-semibold">
          Webbshop <span className="font-semibold text-blue-500">Grupp 2</span>
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <ErrorBoundry>
          <NavLinks />
        </ErrorBoundry>
      </div>
    </header>
  );
}

export default Header;
