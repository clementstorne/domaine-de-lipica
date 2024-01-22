import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllStables } from "../store/stableSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const breakpoint = 1024;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setSubMenuOpen(false);
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      const firstNavLink = document.querySelector(".navlink a");
      if (firstNavLink) {
        firstNavLink.focus();
      }
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    dispatch(getAllStables());
  }, []);

  const stables = useSelector((state) => state.stables.stablesList);
  const error = useSelector((state) => state.stables.error);

  return (
    <header className="navbar">
      <Link to="/" className="fixed" onClick={closeMenu}>
        <img
          src="/logo.png"
          alt="Logo du domaine de Lipica"
          className="w-auto h-14 md:h-24"
        />
      </Link>

      {windowWidth < breakpoint && (
        <div
          className="fixed cursor-pointer right-4 outline-offset-8 outline-blue-900"
          tabIndex="0"
          onClick={toggleMenu}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
          role="button"
        >
          <div
            className={`h-1 w-6 bg-blue-900 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          ></div>
          <div
            className={`my-1 h-1 w-6 bg-blue-900 ${isMenuOpen && "opacity-0"}`}
          ></div>
          <div
            className={`h-1 w-6 bg-blue-900 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          ></div>
        </div>
      )}

      <nav
        className={`${
          windowWidth >= breakpoint
            ? "ml-32 w-full"
            : isMenuOpen
              ? "fixed top-14 flex w-full flex-col flex-nowrap items-center justify-center bg-white text-blue-900 md:top-24"
              : "hidden"
        }`}
      >
        <ul className="navlist">
          <li className="navlink">
            <Link to="/" onClick={closeMenu}>
              Accueil
            </Link>
          </li>
          <li className="navlink">
            <Link to="/presentation" onClick={closeMenu}>
              Présentation
            </Link>
          </li>
          {windowWidth < breakpoint && (
            <>
              {stables.map((stable) => (
                <li key={stable.id} className="navlink">
                  <Link to={`/${stable.url}`} onClick={closeMenu}>
                    {stable.nom}
                  </Link>
                </li>
              ))}
            </>
          )}
          {windowWidth > breakpoint && !error && (
            <li className="relative navlink">
              <span
                onClick={toggleSubMenu}
                tabIndex="0"
                onKeyDown={(e) => e.key === "Enter" && toggleSubMenu()}
                className="cursor-pointer"
              >
                Centre équestre
              </span>
              {isSubMenuOpen && !error && (
                <ul className="submenu">
                  {stables.map((stable) => (
                    <li key={stable.id} className="navlink">
                      <Link to={`/${stable.url}`} onClick={closeMenu}>
                        {stable.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}

          <li className="navlink">
            <Link to="/concours" onClick={closeMenu}>
              Concours
            </Link>
          </li>
          <li className="navlink">
            <Link to="/partenaires" onClick={closeMenu}>
              Partenaires
            </Link>
          </li>
          <li className="navlink">
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
