import { useState } from "react";

const GoalList = ({ data, handleDelete }) => {
  const [editDrop, setEditDrop] = useState(null);
  const [theGoal, setGoal] = useState("");
  const [editYear, setEditYear] = useState(null);
  const [yearGoal, setYearGoal] = useState("");
  const [mark, setMark] = useState("unchecked");

  const handleEdit = (id) => {
    setEditDrop(id);
  };

  const handleYearEdit = (id) => {
    setEditYear(id);
  };

  const handleYearEditOk = (id, theGoal) => {
    const newYear = { theGoal, yearGoal };

    fetch("http://localhost:8000/Goal/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newYear),
    }).then(() => {
      window.location.reload();
    });
  };

  const handleCancel = () => {
    setEditDrop(null);
  };

  const handleOk = (id) => {
    const renamedGoal = { theGoal };

    fetch("http://localhost:8000/Goal/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(renamedGoal),
    }).then(() => {
      window.location.reload();
    });
  };

  const handleCheckMark = (id) => {
    // Add something to this
  };

  return (
    <div className="goal-container">
      {data.map((aGoal) => (
        <div key={aGoal.id} className="goal-item">
          {editDrop !== aGoal.theGoal && (
            <div className="goal-item-content">
              <div>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                  <button className="btn btn-dark border checkbox d-flex justify-content-center align-items-center">
                    {mark === "checked" && <i class="bi bi-check"></i>}
                  </button>
                  <p className="goal-text fw-bold">{aGoal.theGoal}</p>
                </div>
                <p className="goal-text">{aGoal.yearGoal}</p>
              </div>

              {editYear === aGoal.id && (
                <div>
                  <select
                    value={yearGoal}
                    onChange={(e) => setYearGoal(e.target.value)}
                  >
                    <option selected disabled value="">
                      Will take about...
                    </option>
                    <option value="1 Year Goal">1 Year</option>
                    <option value="3 Year Goal">3 Years</option>
                    <option value="5 Year Goal">5 Years</option>
                    <option value="10 Year Goal">10 Years</option>
                  </select>

                  <button
                    onClick={() => handleYearEditOk(aGoal.id, aGoal.theGoal)}
                    className="btn btn-success"
                  >
                    Ok
                  </button>
                </div>
              )}

              <div className="btn-group goal-menu">
                <div
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a
                      onClick={() => handleEdit(aGoal.theGoal)}
                      className="dropdown-item"
                      href="#"
                    >
                      Rename
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleYearEdit(aGoal.id)}
                      className="dropdown-item"
                      href="#"
                    >
                      Change Year Goal
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      onClick={() => handleDelete(aGoal.id)}
                      className="dropdown-item"
                      href="#"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {editDrop === aGoal.theGoal && (
            <div>
              <input
                type="text"
                placeholder={aGoal.theGoal}
                value={theGoal}
                onChange={(e) => setGoal(e.target.value)}
              />

              <button
                onClick={handleCancel}
                className="btn btn-warning"
                href="#"
              >
                Cancel
              </button>

              <button
                onClick={() => handleOk(aGoal.id)}
                className="btn btn-success"
                disabled={!theGoal.trim()}
              >
                Ok
              </button>

              <button
                onClick={() => handleDelete(aGoal.id)}
                className="btn btn-danger"
                href="#"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoalList;
