import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent.jsx";
import AbsageComponent from "./components/AbsageComponent.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/absage" element={<AbsageComponent />} />
    </Routes>
  );
}

export default App;
