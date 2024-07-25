import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import AccomplishmentList from "../Displays/accomplishmentList";

const Accomplished = () => {
  const [accomp, setAccomp] = useState("");
  const [pending, setPending] = useState(false);
  const { data, setData, loading, err } = useFetch(
    "http://localhost:8000/Something"
  );
  const [accompCount, setAccompCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/Something")
      .then((response) => response.json())
      .then((data) => {
        setAccompCount(data.length);
        console.log(`Number of Pages: ${data.length}`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    const done = { accomp };
    setPending(true);

    fetch("http://localhost:8000/Something", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(done),
    }).then(() => {
      setPending(false);
      setAccomp("");
    });
  };

  return (
    <div>
      {accompCount < 5 ? (
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="" className="text-light m-5">
            I Accomplished:
          </label>
          <input
            type="text"
            value={accomp}
            onChange={(e) => setAccomp(e.target.value)}
          />

          {!pending ? (
            <button className="btn btn-success text-light">Submit</button>
          ) : (
            <button disabled className="btn btn-danger text-light">
              Wait...
            </button>
          )}
        </form>
      ) : (
        <div className="d-none">
          <p className="lead text-success text-center m-5 display-2">
            Finished
          </p>
        </div>
      )}

      {accompCount > 0 && (
        <div className="p-5">
          <h3 className="text-warning">Achievements: </h3>
          {loading && <p>Loading...</p>}
          {err && <p>{err}</p>}
          {data && <AccomplishmentList data={data} />}
        </div>
      )}
    </div>
  );
};

export default Accomplished;
