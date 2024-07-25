const AccomplishmentList = ({ data }) => {
  const count = 0;

  return (
    <div>
      {data.map((accList) => (
        <div key={accList.id}>
          <h2 className="text-light">• {accList.accomp}</h2>
        </div>
      ))}
    </div>
  );
};

export default AccomplishmentList;
