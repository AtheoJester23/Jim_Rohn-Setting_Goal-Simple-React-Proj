import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import AccomplishmentList from "../Displays/accomplishmentList";
import accompVid from "../Videos/Accomplishments.mp4";
import { Link } from "react-router-dom";

const Accomplished = () => {
  const [accomp, setAccomp] = useState("");
  const [pending, setPending] = useState(false);
  const { data, setData, loading, err } = useFetch(
    "http://localhost:8000/Something"
  );
  const [accompCount, setAccompCount] = useState(0);
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    fetch("http://localhost:8000/Something/" + id, {
      method: "DELETE",
    }).then(() => {
      const updatedData = data.filter((accList) => accList.id !== id);

      setData(updatedData);

      // Update accompCount based on the new data length
      setAccompCount(updatedData.length);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const done = { accomp };
    setPending(true);

    fetch("http://localhost:8000/Something", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(done),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setPending(false);
        setAccomp("");

        setData([...data, newItem]);

        setAccompCount((prevCount) => prevCount + 1);
      });
  };

  return (
    <div>
      <section className="vidSec">
        <video
          id="video"
          width="700"
          controls
          className="Intro m-5 rounded-4"
          autoPlay
          loop
          muted
        >
          <source src={accompVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {accompCount < 5 ? (
        <div>
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
              <button
                className="btn btn-success text-light"
                disabled={!accomp.trim()}
              >
                Submit
              </button>
            ) : (
              <button disabled className="btn btn-danger text-light">
                Wait...
              </button>
            )}
          </form>

          <h3 className="text-warning">Achievements: </h3>
          {loading && <p>Loading...</p>}
          {err && <p>{err}</p>}
          {data && (
            <AccomplishmentList
              data={data}
              handleDelete={handleDelete}
              setData={setData}
            />
          )}
        </div>
      ) : (
        <div className="d-none">
          <p className="lead text-success text-center m-5 display-2">
            Finished
          </p>
        </div>
      )}

      {accompCount === 5 && (
        <div className="p-5">
          <h3 className="text-warning">Achievements: </h3>
          {loading && <p>Loading...</p>}
          {err && <p>{err}</p>}
          {data && (
            <AccomplishmentList
              data={data}
              handleDelete={handleDelete}
              setData={setData}
            />
          )}

          <Link
            to="/Pages/2"
            className="btn btn-success"
            onClick={() => window.scrollTo(0, 0)}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default Accomplished;
