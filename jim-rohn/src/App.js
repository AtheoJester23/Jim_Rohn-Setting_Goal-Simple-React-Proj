import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import Home from "./Home";
import Navnav from "./Navbar";
import Accomplished from "./Pages/Accomplished";
import NextTen from "./Pages/Next10Years";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import ImportantYearGoal from "./Pages/ImportantYearGoal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navnav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Pages/1" element={<Accomplished />} />
          <Route path="/Pages/2" element={<NextTen />} />
          <Route path="/Pages/3" element={<ImportantYearGoal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
