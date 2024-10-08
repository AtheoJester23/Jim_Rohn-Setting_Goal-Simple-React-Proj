import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import GoalList from "../Displays/GoalList";
import OneYearGoal from "../Displays/YearGoals/OneYearGoal";
import ThreeYearGoal from "../Displays/YearGoals/ThreeYearGoal";
import FiveYearGoal from "../Displays/YearGoals/FiveYearGoal";
import { Windows } from "react-bootstrap-icons";
import TenYearGoal from "../Displays/YearGoals/TenYearGoal";
import vidTwo from "../Videos/NextTen.mp4";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";

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
  const [sortedTasks, setSortedTasks] = useState([]);

  const [isSorted, setIsSorted] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [yearGoal, setYearGoal] = useState("");
  const [goalCount, setGoalCount] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

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
      console.log(isSorted);

      let updatedTasks = [...data];

      if (searchQuery.trim() !== "") {
        updatedTasks = updatedTasks.filter((task) =>
          task.theGoal.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply sorting based on the `isSorted` state
      if (isSorted === "ascending") {
        updatedTasks.sort(
          (a, b) => getYearValue(a.yearGoal) - getYearValue(b.yearGoal)
        );
      } else if (isSorted === "descending") {
        updatedTasks.sort(
          (a, b) => getYearValue(b.yearGoal) - getYearValue(a.yearGoal)
        );
      }

      // Set the updated task list (filtered and/or sorted)
      setTask(updatedTasks);
    }
  }, [data, searchQuery]);

  // Helper function to extract the number from "yearGoal" field
  const getYearValue = (yearGoal) => {
    return parseInt(yearGoal.split(" ")[0]);
  };

  // Function to handle sorting by yearGoal when the button is clicked
  const handleSort = () => {
    if (isSorted != "ascending") {
      // Sort tasks based on the yearGoal as a number
      const sortedTasks = [...task].sort(
        (a, b) => getYearValue(a.yearGoal) - getYearValue(b.yearGoal)
      );
      setTask(sortedTasks);
      setIsSorted("ascending");
    } else {
      // Reset to the original order
      setTask(noSort);
    }
  };

  const handleSortDesc = () => {
    if (isSorted != "descending") {
      // Sort tasks based on the yearGoal as a number
      const sortedTasksDesc = [...task].sort(
        (a, b) => getYearValue(b.yearGoal) - getYearValue(a.yearGoal)
      );
      setTask(sortedTasksDesc);
      setIsSorted("descending"); // Set the sorting state
    } else {
      // Reset to the original order
      setTask(noSort);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setTask(data);
    } else {
      const filteredTasks = data.filter((task) => {
        task.theGoal.toLowerCase().includes(query.toLowerCase());
      });
      setTask(filteredTasks);
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "ascending") {
      handleSort();
    } else if (selectedValue === "descending") {
      handleSortDesc();
    } else {
      // Reset to default (no sorting)
      setTask(noSort);
      setIsSorted(""); // Clear sorting state
    }
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

    // Check if the goal already exists in the data
    const isDuplicate = data.some(
      (goal) => goal.theGoal.toLowerCase() === theGoal.toLowerCase()
    );

    if (isDuplicate) {
      alert("This goal already exist...");
      return;
    }

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
        setYearGoal("");
        setData([...data, newData]);
      });
  };

  const toggleVisibility = () => {
    setIsVisible((boolVis) => !boolVis);
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

      <div>
        <input
          type="text"
          placeholder="Search Keyword"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select className="toSort" onChange={(e) => handleSelectChange(e)}>
          <option selected disabled value="">
            Sort By
          </option>
          <option value="descending">Sort by Date(Descending)</option>
          <option value="ascending">Sort by Date(Ascending)</option>
        </select>
      </div>

      <div className="border border-light m-4 text-light">
        {loading && <p>Loading...</p>}
        {err && <p>{err}</p>}

        {task.length === 0 && (
          <p className="text-center">
            Sorry, we couldn’t find any goals matching your search.
          </p> // Display message when no goals match
        )}

        {data && (
          <GoalList data={task} handleDelete={handleDelete} setData={setData} />
        )}
      </div>

      {data && data.length >= 13 && (
        <div>
          <button className="showTotal" onClick={toggleVisibility}>
            Show Each Total
          </button>
          <div
            class="totalEach"
            style={{ display: isVisible ? "block" : "none" }}
          >
            {data && (
              <h1 className="text-light fw-bold">
                1 Year Goal:{" "}
                {
                  data.filter((count) => count.yearGoal === "1 Year Goal")
                    .length
                }
              </h1>
            )}

            {data && (
              <h1 className="text-light fw-bold">
                3 Year Goal:{" "}
                {
                  data.filter((count) => count.yearGoal === "3 Year Goal")
                    .length
                }
              </h1>
            )}

            {data && (
              <h1 className="text-light fw-bold">
                5 Year Goal:{" "}
                {
                  data.filter((count) => count.yearGoal === "5 Year Goal")
                    .length
                }
              </h1>
            )}

            {data && (
              <h1 className="text-light fw-bold">
                10 Year Goal:{" "}
                {
                  data.filter((count) => count.yearGoal === "10 Year Goal")
                    .length
                }
              </h1>
            )}
          </div>

          <Link to="/Pages/3" className="btn btn-success">
            Next
          </Link>
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
