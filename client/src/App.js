import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import GateDetails from "./components/FlightData/Airport Employee/GateDetails";

function App() {
  const user = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/GateDetails" exact element={<GateDetails />} />
      {user && (
        <Route path="/" element={<Main />}>
          <Route path="/user/arrivals" />
          <Route path="/user/departures" />
          <Route path="/employee/arrivals" />
          <Route path="/employee/departures" />
          <Route path="/airportemp/arrivals" />
          <Route path="/airportemp/departures" />
        </Route>
      )}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
