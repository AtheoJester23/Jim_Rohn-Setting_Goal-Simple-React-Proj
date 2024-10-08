import ImpOneYear from "../Displays/YearGoals/ImpOneYear";
import useFetch from "../useFetch";

const ImportantYearGoal = () => {
  const { data, loading, err } = useFetch("http://localhost:8000/Goal");

  return (
    <div className="p-5">
      <h1 className="text-light display">
        On Your List of 1 Year Goals, Which Are The 4 Most Important?
      </h1>

      <div className="text-light">
        {data && (
          <div className="text-center p-5">
            <ImpOneYear data={data} />
          </div>
        )}
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia neque
        saepe ex delectus temporibus libero omnis id quis nemo similique
        expedita nobis obcaecati, modi autem, cumque minima, veniam animi.
        Sequi!
      </p>
    </div>
  );
};

export default ImportantYearGoal;
