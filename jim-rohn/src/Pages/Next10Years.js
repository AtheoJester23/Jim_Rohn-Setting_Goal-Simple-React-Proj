import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import GoalList from "../Displays/GoalList";
import OneYearGoal from "../Displays/YearGoals/OneYearGoal";
import ThreeYearGoal from "../Displays/YearGoals/ThreeYearGoal";
import FiveYearGoal from "../Displays/YearGoals/FiveYearGoal";
import { Windows } from "react-bootstrap-icons";
import TenYearGoal from "../Displays/YearGoals/TenYearGoal";
import vidTwo from "../Videos/NextTen.mp4";

const NextTen = ({ filteredData }) => {
  const [accompCount, setAccompCount] = useState(0);
  const [mark, setMark] = useState("notDone");
  const [theGoal, setGoal] = useState("");
  const [pending, setPending] = useState(false);
  const { data, setData, loading, err } = useFetch(
    "http://localhost:8000/Goal"
  );

  // Initialize task and noSort with empty arrays
  const [task, setTask] = useState([...(data || [])]);
  const [noSort, setNoSort] = useState([...(data || [])]);

  const [isSorted, setIsSorted] = useState(false);

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

  useEffect(() => {
    if (data) {
      setTask([...data]); // Update task when data changes
      setNoSort([...data]); // Update noSort when data changes
    }
  }, [data]);

  // Helper function to extract the number from "yearGoal" field
  const getYearValue = (yearGoal) => {
    return parseInt(yearGoal.split(" ")[0]);
  };

  // Function to handle sorting by yearGoal when the button is clicked
  const handleSort = () => {
    if (!isSorted) {
      // Sort tasks based on the yearGoal as a number
      const sortedTasks = [...task].sort(
        (a, b) => getYearValue(a.yearGoal) - getYearValue(b.yearGoal)
      );
      setTask(sortedTasks);
    } else {
      // Reset to the original order
      setTask(noSort);
    }
    setIsSorted(!isSorted); // Toggle sorted state
  };

  const handleDelete = (id) => {
    fetch("http://localhost:8000/Goal/" + id, {
      method: "DELETE",
    }).then(() => {
      const newGoalList = data.filter((display) => display.id !== id);
      setData(newGoalList);
    });
  };

  const handleSub = (e) => {
    e.preventDefault();
    const Goalset = { theGoal, yearGoal, mark };
    setPending(true);

    fetch("http://localhost:8000/Goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Goalset),
    })
      .then((res) => {
        return res.json();
      })
      .then((newData) => {
        setPending(false);
        setGoal("");

        setData([...data, newData]);
      });
  };

  return (
    <div className="container m-5">
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
          <source src={vidTwo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

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

      <button onClick={handleSort}>
        {isSorted ? "Reset" : "Sort by Year"}
      </button>

      <div className="border border-light m-4 text-light">
        {loading && <p>Loading...</p>}
        {err && <p>{err}</p>}
        {data && (
          <GoalList data={task} handleDelete={handleDelete} setData={setData} />
        )}
      </div>

      {data && data.length >= 13 && (
        <div>
          {data && (
            <h1 className="text-light fw-bold">
              1 Year Goal:{" "}
              {data.filter((count) => count.yearGoal === "1 Year Goal").length}
            </h1>
          )}

          {data && (
            <h1 className="text-light fw-bold">
              3 Year Goal:{" "}
              {data.filter((count) => count.yearGoal === "3 Year Goal").length}
            </h1>
          )}

          {data && (
            <h1 className="text-light fw-bold">
              5 Year Goal:{" "}
              {data.filter((count) => count.yearGoal === "5 Year Goal").length}
            </h1>
          )}

          {data && (
            <h1 className="text-light fw-bold">
              10 Year Goal:{" "}
              {data.filter((count) => count.yearGoal === "10 Year Goal").length}
            </h1>
          )}
        </div>
      )}

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

      <div className="text-center text-warning border m-4">
        <h2 className="display-2">Notes:</h2>
        <p className="lead text-warning text-center fst-italic mt-3">
          &#8226; When you accomplish some goal, you need some more to
          accomplish - Jim Rohn
        </p>
        <p className="lead text-warning text-center fst-italic mt-3">
          &#8226; If its just a goal that is really important to you and you
          finally reached it, celebrate - Jim Rohn
        </p>
        <p className="lead text-warning text-center fst-italic mt-3">
          &#8226; If the family together finally reaches a goal, celebrate with
          the family- Jim Rohn
        </p>
        <p className="lead text-warning text-center fst-italic mt-3">
          &#8226; It's very important that if something's not that important to
          you to take it off your list
        </p>
      </div>
    </div>
  );
};

export default NextTen;
