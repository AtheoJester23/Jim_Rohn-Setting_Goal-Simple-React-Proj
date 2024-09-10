const FiveYearGoal = ({ data }) => {
  const filteredData = data.filter(
    (theYear) => theYear.yearGoal === "5 Year Goal"
  );

  return (
    <div className="">
      {filteredData.map((aYearGoal) => (
        <div key={aYearGoal.id} className="col">
          <p className="text-light truncate">&#8226; {aYearGoal.theGoal}</p>
        </div>
      ))}
      <p className="lead text-light">{`Total: ` + filteredData.length}</p>
    </div>
  );
};

export default FiveYearGoal;
