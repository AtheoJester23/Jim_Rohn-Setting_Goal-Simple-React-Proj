import PageList from "./Pages/PageList";
import useFetch from "./useFetch";
import myVid from "./Videos/Intro.mp4";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const Home = () => {
  const { data, loading, err } = useFetch("http://localhost:8000/Pages");

  return (
    <div>
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
          <source src={myVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {loading && <p>Loading...</p>}
      {err && <p>{err}</p>}
      {data && <PageList data={data} />}
    </div>
  );
};

export default Home;
