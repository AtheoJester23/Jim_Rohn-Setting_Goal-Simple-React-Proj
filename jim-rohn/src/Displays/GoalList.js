import * as Icon from "react-bootstrap-icons";

const GoalList = ({ data, handleDelete }) => {
  return (
    <div>
      {data.map((aGoal) => (
        <div key={aGoal.id} className="d-flex align-items-center">
          <p className="text-light">{aGoal.theGoal}</p>

          <div className="btn-group">
            <button
              className="btn btn-light"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div>

          {/* <div>
            <button
              onClick={() => handleDelete(aGoal.id)}
              className="btn btn-light"
            >
              <i class="bi bi-three-dots text-secondary"></i>
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default GoalList;
