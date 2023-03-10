import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">
          <h1>Logo</h1>
        </Link>
      </div>
      <div className="nav-right">
        <ul className="nav-items">
          <li>
            <Link to="/start">Home</Link>
          </li>
          <li>
            <Link to="/login">Login / Signup</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
