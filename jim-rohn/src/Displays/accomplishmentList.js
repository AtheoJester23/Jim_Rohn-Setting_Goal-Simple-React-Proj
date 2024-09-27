import { useState } from "react";
import accompVid from "../Videos/Accomplishments.mp4";

const AccomplishmentList = ({ data, handleDelete, setData }) => {
  const [accomp, setAccomp] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleUpdate = (id) => {
    const newOne = { accomp };
    fetch("http://localhost:8000/Something/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOne),
    }).then(() => {
      // Update the specific item in the data list
      setData(
        data.map((accList) =>
          accList.id === id ? { ...accList, accomp: newOne.accomp } : accList
        )
      );
      setEditingId(null); // Reset editing state
    });
  };

  const handleEdit = (id, currentAccomp) => {
    setEditingId(id);
    setAccomp(currentAccomp || "");
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div>
      {data.map((accList) => (
        <div key={accList.id} className="d-flex gap-3 p-2 m-3">
          {editingId !== accList.id && (
            <div className="d-flex gap-3">
              <h2 className="text-light">• {accList.accomp}</h2>

              <div className="d-flex gap-2">
                <button
                  onClick={() => handleEdit(accList.id)}
                  className="btn btn-primary text-light"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(accList.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {editingId === accList.id && (
            <div className="d-flex gap-3">
              <input
                placeholder={accList.accomp}
                type="text"
                value={accomp}
                onChange={(e) => setAccomp(e.target.value)}
              />
              <button onClick={handleCancel} className="btn btn-warning">
                Cancel
              </button>

              <div className="d-flex gap-2">
                <button
                  onClick={() => handleUpdate(accList.id)}
                  className="btn btn-success"
                  disabled={!accomp.trim()}
                >
                  Submit
                </button>
                <button
                  onClick={() => handleDelete(accList.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccomplishmentList;
