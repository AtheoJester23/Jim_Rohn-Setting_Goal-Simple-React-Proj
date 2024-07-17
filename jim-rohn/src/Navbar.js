import { Link } from "react-router-dom";

const Navnav = () => {
  return (
    <nav className="navbar p-3 navnav">
      <Link to="/" className="navbar-brand text-light fw-bold">
        Jim Rohn's Setting Goal
      </Link>

      <div>
        <Link to="/" className="btn border border-light text-light">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navnav;
