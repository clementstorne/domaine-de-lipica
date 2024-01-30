import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-between flex-nowrap">
      <Link to="/">
        <img
          src="/logo-domaine-lipica.png"
          alt="Logo du domaine de Lipica"
          className="h-14 md:h-24"
        />
      </Link>
      <nav className="text-xs leading-4 text-center md:w-7/12 md:text-md-xl md:font-semibold">
        <ul className="flex-row items-center justify-between flex-nowrap md:flex">
          <li className="mb-0.5 hover:mb-0 hover:border-b-2 hover:border-blue-900">
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li className="mb-0.5 hover:mb-0 hover:border-b-2 hover:border-blue-900">
            <Link to="/plan-du-site">Plan du site</Link>
          </li>
          <li className="mb-0.5 hover:mb-0 hover:border-b-2 hover:border-blue-900">
            <Link to="/administration/login">Administration</Link>
          </li>
        </ul>
      </nav>
      <div className="text-center text-[8px] leading-3 md:text-md-xs">
        <p className="m-0">Designed by</p>
        <a
          href="https://clementstorne.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-medium md:text-md-sm"
        >
          Clément <br />
          Storne
        </a>
        <p className="m-0 font-light normal-case">© 2024</p>
      </div>
    </footer>
  );
}
