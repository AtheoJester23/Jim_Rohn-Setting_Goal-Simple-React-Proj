import { useState } from "react";

const ImpOneYear = ({ data }) => {
  const [goals, setGoals] = useState(
    data.map((goal) => ({
      ...goal,
      selected: goal.selected || "not",
    }))
  );

  const selectedCount = goals.filter((goal) => goal.selected === "yes").length;

  const handleSelect = (id) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        if (goal.selected === "yes") {
          return { ...goal, selected: "not" };
        } else if (selectedCount < 4) {
          return { ...goal, selected: "yes" };
        }
      }
      return goal;
    });

    setGoals(updatedGoals);

    fetch("http://localhost:8000/Goal/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected: updatedGoals.selected }),
    });
  };

  const filteredData =
    selectedCount < 4
      ? goals.filter((aYear) => aYear.yearGoal === "1 Year Goal")
      : goals.filter((goal) => goal.selected === "yes");

  return (
    <div className="">
      {filteredData.map((aYearGoal) => (
        <div key={aYearGoal.id} className="col">
          <button
            onClick={() => handleSelect(aYearGoal.id)}
            className="text-dark btn btn-warning mb-3 border border-3"
          >
            &#8226; {aYearGoal.theGoal} (Selected: {aYearGoal.selected})
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImpOneYear;
