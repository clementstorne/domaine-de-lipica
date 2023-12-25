import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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
          className="h-14 md:h-24 w-auto"
        />
      </Link>

      {windowWidth < 768 && (
        <div
          className="fixed right-4 outline-blue-900 cursor-pointer"
          tabIndex="0"
          onClick={toggleMenu}
          onKeyPress={(e) => e.key === "Enter" && toggleMenu()}
          role="button"
        >
          <div
            className={`bg-blue-900 w-6 h-1 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`bg-blue-900 w-6 h-1 my-1 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`bg-blue-900 w-6 h-1 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </div>
      )}

      <nav
        className={`${
          windowWidth >= 768
            ? "ml-32 w-full"
            : isMenuOpen
            ? "fixed w-full top-14 flex flex-col flex-nowrap justify-center items-center bg-white text-blue-900"
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
          <li className="navlink">
            <Link to="/">Centre équestre</Link>
          </li>
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
