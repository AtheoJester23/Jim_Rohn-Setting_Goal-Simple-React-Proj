import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navnav from "./Navbar";
import Accomplished from "./Pages/Accomplished";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navnav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Pages/1" element={<Accomplished />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
