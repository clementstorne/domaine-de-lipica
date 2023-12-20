import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-row flex-nowrap justify-between items-center">
      <Link to="/">
        <img
          src="/logo.png"
          alt="Logo du domaine de Lipica"
          className="h-14 md:h-24"
        />
      </Link>
      <nav className="md:w-7/12 text-xs md:text-md-xl md:font-semibold leading-4 text-center">
        <ul className="md:flex flex-row flex-nowrap justify-between">
          <li className="mb-0.5 hover:mb-0 hover:border-b-2 hover:border-blue-900">
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li className="mb-0.5 hover:mb-0 hover:border-b-2 hover:border-blue-900">
            <Link to="/mentions-legales">Plan du site</Link>
          </li>
          <li className="mb-0.5 hover:mb-0 hover:border-b-2 hover:border-blue-900">
            <Link to="/mentions-legales">Administration</Link>
          </li>
        </ul>
      </nav>
      <div className="text-center text-[8px] md:text-md-xs leading-3">
        <p className="m-0">Designed by</p>
        <a
          href="https://clementstorne.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-md-sm font-medium"
        >
          Clément <br />
          Storne
        </a>
        <p className="m-0 font-light normal-case">© 2023</p>
      </div>
    </footer>
  );
}
