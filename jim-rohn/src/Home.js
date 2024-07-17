import PageList from "./Pages/PageList";
import useFetch from "./useFetch";

const Home = () => {
  const { data, loading, err } = useFetch("http://localhost:8000/Pages");

  return (
    <div>
      {loading && <p>Loading...</p>}
      {err && <p>{err}</p>}
      {data && <PageList data={data} />}
    </div>
  );
};

export default Home;
