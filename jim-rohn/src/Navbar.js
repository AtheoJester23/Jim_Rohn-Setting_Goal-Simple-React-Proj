import { Link } from "react-router-dom";

const Navnav = () => {
  return (
    <nav className="navbar p-3 navnav">
      <Link to="/" className="navbar-brand">
        <img className="brandName" src={require(`./Img/1.png`)} alt="" />
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
