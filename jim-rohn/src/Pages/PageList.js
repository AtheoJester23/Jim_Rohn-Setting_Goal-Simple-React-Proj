import { Link } from "react-router-dom";

const PageList = ({ data }) => {
  return (
    <div>
      {data.map((page) => (
        <Link
          to={`/Pages/${page.id}`}
          key={page.id}
          className="m-5 border border-light p-4 text-center rounded text-decoration-none d-flex flex-column"
        >
          <h2 className="display text-light">{page.Page}</h2>
        </Link>
      ))}
    </div>
  );
};

export default PageList;
