import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ArrivalsGeneralUsers from "./components/FlightData/GeneralUsers/ArrivalsGeneralUsers";
import DeparturesGeneralUsers from "./components/FlightData/GeneralUsers/DeparturesGeneralUsers";
import ArrivalsAirlineEmp from "./components/FlightData/Airline Employees/ArrivalsAirlineEmp";
import DeparturesAirlineEmp from "./components/FlightData/Airline Employees/DeparturesAirlineEmp";

function App() {
  const user = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      {user && (
        <Route path="/" element={<Main />}>
          <Route path="/user/arrivals" />
          <Route path="/user/departures" />
          <Route path="/employee/arrivals" />
          <Route path="/employee/departures" />
        </Route>
      )}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
