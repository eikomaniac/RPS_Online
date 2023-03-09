import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Play from "./components/Play";
import PlayCPU from "./components/PlayCPU";
import RPSGame from "./components/RPSGame";
import Spectate from "./components/Spectate";
import Stats from "./components/Stats";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="play" element={<Play />} />
          <Route path="play-cpu">
            <Route index={true} element={<PlayCPU />} />
            <Route path="beginner" element={<RPSGame difficulty="beginner" />} />
            <Route path="intermediate" element={<RPSGame difficulty="intermediate" />} />
            <Route path="advanced" element={<RPSGame difficulty="advanced" />} />
          </Route>
          <Route path="spectate" element={<Spectate />} />
          <Route path="stats" element={<Stats />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
