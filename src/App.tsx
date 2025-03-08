import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
// import AlgorithmRacePage from "./pages/AlgorithmRacePage";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer/:algorithm" element={<Visualizer />} />
        <Route path="/leaderboard/:visualizer" element={<Leaderboard />} />
        <Route path="/not-found" element={<NotFound />}/>
        <Route path="*" element={<NotFound />}/>

        {/* <Route path="/sorting" element={<Visualizer />} />
        <Route path="/searching" element={<Visualizer />} />
        <Route path="/graph" element={<Visualizer />} />
        <Route path="/race-mode" element={<AlgorithmRacePage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
