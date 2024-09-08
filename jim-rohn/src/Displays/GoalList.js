import React, { useState, useEffect } from "react";
import Tooltip from "../toolTip";
import * as bootstrap from "bootstrap";

const GoalList = ({ data, handleDelete }) => {
  const [editDrop, setEditDrop] = useState(null);
  const [theGoal, setGoal] = useState("");
  const [editYear, setEditYear] = useState(null);
  const [yearGoal, setYearGoal] = useState("");
  const [mark, setMark] = useState("notDone");
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // dropdown settings:
  const theDropdown = document.querySelector(".drpdwn");

  useEffect(() => {
    // Initialize Bootstrap dropdowns
    const dropdownElements = document.querySelectorAll(".dropdown-toggle");
    dropdownElements.forEach((dropdown) => new bootstrap.Dropdown(dropdown));
  }, []);

  const handleEdit = (id) => {
    setEditDrop(id);
  };

  const handleYearEdit = (id) => {
    setEditYear(id);
    setDropdownVisible(null);
  };

  const handleYearEditOk = (id, theGoal, mark) => {
    const newYear = { theGoal, yearGoal, mark };

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
    setDropdownVisible(null);
    setEditYear(null);
    setYearGoal("");
  };

  const handleOk = (id, yearGoal, mark) => {
    const renamedGoal = { theGoal, yearGoal, mark };

    fetch("http://localhost:8000/Goal/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(renamedGoal),
    }).then(() => {
      window.location.reload();
    });
  };

  const handleCheckMark = (id, currentMark, theGoal, yearGoal) => {
    const markUpdate = currentMark === "notDone" ? "Done" : "notDone";
    const updatedMark = { mark: markUpdate, theGoal, yearGoal };

    fetch(`http://localhost:8000/Goal/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMark),
    }).then(() => {
      setMark(markUpdate);
      window.location.reload();
    });
  };

  // Toggle dropdown visibility
  const handleDropdown = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
    setEditYear(null);
    setYearGoal("");
  };

  return (
    <div className="goal-container p-5">
      {data.map((aGoal) => (
        <div key={aGoal.id} className="goal-item">
          {editDrop !== aGoal.id && (
            <div className="goal-item-content">
              {editYear !== aGoal.id && ( // Only show this section when 'editYear' is NOT equal to 'aGoal.id'
                <div className="box_and_title">
                  <div className="d-flex gap-2 justify-content-center align-items-center">
                    <button
                      className="btn btn-dark border checkbox d-flex justify-content-center align-items-center"
                      onClick={() =>
                        handleCheckMark(
                          aGoal.id,
                          aGoal.mark,
                          aGoal.theGoal,
                          aGoal.yearGoal
                        )
                      }
                    >
                      {aGoal.mark === "Done" && <i class="bi bi-check"></i>}
                    </button>
                    <Tooltip text={aGoal.theGoal}>
                      <p className="goal-text fw-bold truncate">
                        {aGoal.theGoal}
                      </p>
                    </Tooltip>
                  </div>
                  <p className="goal-text">{aGoal.yearGoal}</p>
                </div>
              )}

              {editYear === aGoal.id && (
                <div class="editingYear">
                  <p className="goal-text fw-bold truncate">{aGoal.theGoal}</p>

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

                  <div className="editYearButtons">
                    <button
                      onClick={() =>
                        handleYearEditOk(aGoal.id, aGoal.theGoal, aGoal.mark)
                      }
                      className="btn btn-success"
                      disabled={!yearGoal}
                    >
                      Ok
                    </button>
                    <button className="btn btn-danger" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {editYear !== aGoal.id && ( // So that it won't be shown when we're changing the year
                <div className="goal-menu">
                  <div
                    type="button"
                    className="btn drpdwn"
                    onClick={() => handleDropdown(aGoal.id)}
                  >
                    <i className="bi bi-three-dots"></i>
                  </div>
                  <section
                    className={`drpdwn-menu ${
                      dropdownVisible === aGoal.id ? "showTheDrpdwn" : ""
                    }`}
                    aria-labelledby={`dropdownMenuButton-${aGoal.id}`}
                  >
                    <div>
                      <a
                        onClick={() => handleEdit(aGoal.id)}
                        className="dropdown-item"
                        href="#"
                      >
                        Rename
                      </a>
                    </div>
                    <div>
                      <a
                        onClick={() => handleYearEdit(aGoal.id)}
                        className="dropdown-item"
                        href="#"
                      >
                        Change Year Goal
                      </a>
                    </div>
                    <div>
                      <a
                        onClick={handleCancel}
                        className="dropdown-item"
                        href="#"
                      >
                        Cancel
                      </a>
                    </div>
                    <div>
                      <a
                        onClick={() => handleDelete(aGoal.id)}
                        className="dropdown-item"
                        href="#"
                      >
                        Delete
                      </a>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}
          {editDrop === aGoal.id && (
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
                onClick={() => handleOk(aGoal.id, aGoal.yearGoal, aGoal.mark)}
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
