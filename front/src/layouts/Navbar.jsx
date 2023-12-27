import stables from "../data/ecuries.json";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const breakpointLg = 1024;
  const breakpointMd = 768;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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

  return (
    <header className="navbar">
      <Link to="/" className="fixed">
        <img
          src="/logo.png"
          alt="Logo du domaine de Lipica"
          className="h-14 w-auto md:h-24"
        />
      </Link>

      {windowWidth < breakpointLg && (
        <div
          className="fixed right-4 cursor-pointer outline-offset-8 outline-blue-900"
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
            className={`my-1 h-1 w-6 bg-blue-900 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
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
          windowWidth >= breakpointLg
            ? "ml-32 w-full"
            : isMenuOpen
              ? "fixed top-14 flex w-full flex-col flex-nowrap items-center justify-center bg-white text-blue-900"
              : "hidden"
        }`}
      >
        <ul className="navlist">
          <li className="navlink">
            <Link to="/">Accueil</Link>
          </li>
          <li className="navlink">
            <Link to="/presentation">Présentation</Link>
          </li>
          <li className="navlink relative">
            <span
              onClick={toggleSubMenu}
              tabIndex="0"
              onKeyDown={(e) => e.key === "Enter" && toggleSubMenu()}
              className="cursor-pointer"
            >
              Centre équestre
            </span>
            {isSubMenuOpen && windowWidth > breakpointMd && (
              <ul className="submenu">
                {stables.map((stable) => (
                  <li key={stable.id} className="navlink">
                    <Link to={`/${stable.url}`}>{stable.nom}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {isSubMenuOpen && windowWidth < breakpointMd && (
            <>
              {stables.map((stable) => (
                <li key={stable.id} className="navlink">
                  <Link to={`/${stable.url}`}>{stable.nom}</Link>
                </li>
              ))}
            </>
          )}
          <li className="navlink">
            <Link to="/concours">Concours</Link>
          </li>
          <li className="navlink">
            <a
              href="https://ozoir.winjump.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Engagés et résultats
            </a>
          </li>
          <li className="navlink">
            <Link to="/partenaires">Partenaires</Link>
          </li>
          <li className="navlink">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
