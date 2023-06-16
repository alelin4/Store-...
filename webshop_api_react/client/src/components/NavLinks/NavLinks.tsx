import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GrFormClose, GrMenu } from "react-icons/gr";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToCart from "../ToCart/ToCart";
import SideMenuCartIcon from "../SideMenuCartIcon/SideMenuCartIcon";

function NavLinks() {
  const token = Cookies.get("token");
  const loggedIn = token ? true : false;
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileMenuClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <ul className="flex list-none gap-2 mr-2 d-none d-md-flex">
        <NavLink to="/" onClick={handleMobileMenuClick}>
          <li>Våra produkter</li>
        </NavLink>
        {loggedIn ? (
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logga ut
          </li>
        ) : (
          <NavLink to="/login" onClick={handleMobileMenuClick}>
            <li>Logga in</li>
          </NavLink>
        )}
        <NavLink to="/contact" onClick={handleMobileMenuClick}>
          <li>Kundservice</li>
        </NavLink>
        <NavLink to="/about" onClick={handleMobileMenuClick}>
          <li>Om oss</li>
        </NavLink>
        <NavLink to="/cart" onClick={handleMobileMenuClick}>
          <ToCart />
        </NavLink>
      </ul>

      {/* Offcanvas for mobile menu */}
      <div>
        <div className="d-md-none">
          <div className="d-flex align-items-center">
            <NavLink to="/cart" onClick={handleMobileMenuClick}>
              <ToCart />
            </NavLink>
            <button className="btn btn-primary" onClick={toggleMobileMenu}>
              <span className="text-2xl">
                <GrMenu />
              </span>
            </button>
          </div>{" "}
          <div className={showMobileMenu ? "bg-black" : ""}>
            <Offcanvas
              show={showMobileMenu}
              onHide={toggleMobileMenu}
              placement="end"
              backdrop={true}
              backdropClassName={showMobileMenu ? "bg-black text-white" : ""}
            >
              <Offcanvas.Header>
                <Offcanvas.Title>Meny</Offcanvas.Title>
                <button
                  className="btn btn-close"
                  onClick={toggleMobileMenu}
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    zIndex: "1",
                  }}
                >
                  <GrFormClose size={1} />
                </button>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <NavLink to="/cart" onClick={handleMobileMenuClick}>
                      <SideMenuCartIcon />
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/" onClick={handleMobileMenuClick}>
                      Våra produkter
                    </NavLink>
                  </li>
                  {loggedIn ? (
                    <li
                    className="mb-2"
                      onClick={() => {
                        handleLogout();
                        handleMobileMenuClick();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Logga ut
                    </li>
                  ) : (
                    <li className="mb-2">
                      <NavLink to="/login" onClick={handleMobileMenuClick}>
                        Logga in
                      </NavLink>
                    </li>
                  )}
                  <li className="mb-2">
                    <NavLink to="/contact" onClick={handleMobileMenuClick}>
                      Kundservice
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" onClick={handleMobileMenuClick}>
                      Om oss
                    </NavLink>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default NavLinks;
