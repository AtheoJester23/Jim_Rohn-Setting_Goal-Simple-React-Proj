import { useState } from "react";

const AccomplishmentList = ({ data, handleDelete }) => {
  const [accomp, setAccomp] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleUpdate = (id) => {
    const newOne = { accomp };
    fetch("http://localhost:8000/Something/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOne),
    }).then(() => {
      window.location.reload();
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
