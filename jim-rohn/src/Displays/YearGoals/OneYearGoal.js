const OneYearGoal = ({ data }) => {
  const filteredData = data.filter((aYear) => aYear.yearGoal === "1 Year Goal");

  return (
    <div className="">
      {filteredData.map((aYearGoal) => (
        <div key={aYearGoal.id} className="col">
          <p className="text-light">&#8226; {aYearGoal.theGoal}</p>
        </div>
      ))}
      <p className="lead text-light">{`Total: ` + filteredData.length}</p>
    </div>
  );
};

export default OneYearGoal;
