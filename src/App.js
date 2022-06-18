import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cashier from "./pages/cashier/Cashier";
import Home from "./pages/home/Home";
import Kitchen from "./pages/kitchen/Kitchen";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cashier" element={<Cashier />} />
          <Route exact path="/kitchen" element={<Kitchen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
