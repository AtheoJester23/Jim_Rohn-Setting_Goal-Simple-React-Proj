import { useState } from "react";
import { useParams } from "react-router-dom";

const Accomplished = () => {
  const { id } = useParams();
  const [accomp, setAccomp] = useState("");

  return (
    <div>
      <form action="">
        <label htmlFor="" className="text-light m-5">
          Accomplished:
        </label>
        <input
          type="text"
          value={accomp}
          onChange={(e) => setAccomp(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Accomplished;
