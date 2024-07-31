import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import GoalList from "../Displays/GoalList";
import OneYearGoal from "../Displays/YearGoals/OneYearGoal";
import ThreeYearGoal from "../Displays/YearGoals/ThreeYearGoal";
import FiveYearGoal from "../Displays/YearGoals/FiveYearGoal";
import { Windows } from "react-bootstrap-icons";
import TenYearGoal from "../Displays/YearGoals/TenYearGoal";

const NextTen = ({ filteredData }) => {
  const [accompCount, setAccompCount] = useState(0);
  const [theGoal, setGoal] = useState("");
  const [pending, setPending] = useState(false);
  const { data, setData, loading, err } = useFetch(
    "http://localhost:8000/Goal"
  );
  const [yearGoal, setYearGoal] = useState("");
  const [goalCount, setGoalCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/Goal")
      .then((response) => response.json())
      .then((data) => {
        setGoalCount(data.length);
        console.log(`Number of Pages: ${data.length}`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch("http://localhost:8000/Goal/" + id, {
      method: "DELETE",
    }).then(() => {
      const newGoalList = data.filter((display) => display.id !== id);
      setData(newGoalList);
    });
  };

  const handleSub = (e) => {
    const Goalset = { theGoal, yearGoal };
    setPending(true);

    fetch("http://localhost:8000/Goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Goalset),
    }).then(() => {
      setPending(false);
      setGoal("");
      window.location.reload();
    });
  };

  return (
    <div className="container m-5">
      <form onSubmit={handleSub}>
        <label className="text-light">Goal: </label>
        <input
          type="text"
          value={theGoal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <select value={yearGoal} onChange={(e) => setYearGoal(e.target.value)}>
          <option selected disabled value="">
            Will take about...
          </option>
          <option value="1 Year Goal">1 Year</option>
          <option value="3 Year Goal">3 Years</option>
          <option value="5 Year Goal">5 Years</option>
          <option value="10 Year Goal">10 Years</option>
        </select>

        <button
          className="btn btn-success"
          disabled={!theGoal.trim() || !yearGoal}
        >
          Submit
        </button>
      </form>

      <div className="border border-light p-5 m-4 text-light">
        {loading && <p>Loading...</p>}
        {err && <p>{err}</p>}
        {data && <GoalList data={data} handleDelete={handleDelete} />}
      </div>

      <div className="row text-center">
        <div className="col-sm text-light border border-light">
          <div className="border">1 Year Goal</div>
          <div>{data && <OneYearGoal data={data} />}</div>
        </div>
        <div className="col-sm text-light border border-light">
          <div className="border">3 Year Goal</div>
          <div>{data && <ThreeYearGoal data={data} />}</div>
        </div>
        <div className="col-sm text-light border border-light">
          <div className="border">5 Year Goal</div>
          <div>{data && <FiveYearGoal data={data} />}</div>
        </div>
        <div className="col-sm text-light border border-light">
          <div className="border">10 Year Goal</div>
          <div>{data && <TenYearGoal data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default NextTen;
