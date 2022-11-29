import { useEffect, useState } from "react";
import FlightDetails from "../FlightData/FlightDetails";
import GeneralUsers from "../FlightData/GeneralUsers/FlightsGeneralUsers";
import ArrivalsGeneralUsers from "../FlightData/GeneralUsers/ArrivalsGeneralUsers";
import styles from "./styles.module.css";
import DeparturesGeneralUsers from "../FlightData/GeneralUsers/DeparturesGeneralUsers";
import FlightDetailsTable from "../FlightData/FlightDetails";
import ArrivalsAirlineEmp from "../FlightData/Airline Employees/ArrivalsAirlineEmp";
import DeparturesAirlineEmp from "../FlightData/Airline Employees/DeparturesAirlineEmp";
import GetCurrentTime from "../Time/GetCurrentTime";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrivalsAirportEmp from "../FlightData/Airport Employee/ArrivalsAirportEmp";
import DeparturesAirportEmp from "../FlightData/Airport Employee/DeparturesAirportEmp";
import { Button } from "bootstrap";
import { Badge } from "react-bootstrap";
import "./custom.css";
import "bootstrap/dist/css/bootstrap.css";

const Main = () => {
  const navigate = useNavigate();
  const [getArrivals, setGetArrivals] = useState("arrivals");
  const [getNewTime, setNewTime] = useState("All flights");

  const handleArrivals = () => {
    console.log("from handleArrivals");
  };

  const handleDepartures = () => {
    console.log("from handleDepartures");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log("User role :", user);

  const handleNavigate = (page) => {
    var path = "/";
    console.log(user.role);
    if (user.role === "User") {
      path += "user";
    } else if (user.role === "Airline Employee") {
      path += "employee";
    } else if (user.role === "Airport Employee") {
      path += "airportemp";
    }
    path += "/" + page;
    navigate(path);
  };

  const myComponentStyle = {
    marginRight: 10,
    marginTop: 5,
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <span>
          <h4 style={{ marginTop: "15px" }}>
            Welcome back,
            <span className="badge badge-light">{user.firstName}</span>
          </h4>
          <p>({user.role})</p>
        </span>

        <h3>Airport Management System</h3>

        {/* <span
          style={{
            display: "flex",
          }}
        >
          <span>
            <label style={{ marginRight: "10px" }}>Arrivals</label>
            <input
              type="radio"
              name="arrivals"
              value={getArrivals}
              onClick={() => handleNavigate("arrivals")}
              onChange={handleArrivals}
              checked={getArrivals == "arrivals"}
            />
          </span>
          <span style={{ marginLeft: "10px" }}>
            <label style={{ marginRight: "10px" }}>Departures</label>
            <input
              type="radio"
              name="departures"
              value={getArrivals}
              onClick={() => handleNavigate("departures")}
              checked={getArrivals == "departures"}
            />
          </span>
        </span> */}

        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="cus_btn">
        <button
          type="button"
          style={myComponentStyle}
          className="btn btn-primary custom-btn"
          name="arrivals"
          onClick={() => handleNavigate("arrivals")}
        >
          Arrivals
        </button>
        <button
          type="button"
          className="btn btn-primary custom-btn "
          name="departures"
          onClick={() => handleNavigate("departures")}
        >
          Departures
        </button>
      </div>

      <Routes>
        {user.role === "User" && (
          <Route path="/user/arrivals" element={<ArrivalsGeneralUsers />} />
        )}
        {user.role === "User" && (
          <Route path="/user/departures" element={<DeparturesGeneralUsers />} />
        )}
        {user.role === "Airline Employee" && (
          <Route path="/employee/arrivals" element={<ArrivalsAirlineEmp />} />
        )}
        {user.role === "Airline Employee" && (
          <Route
            path="/employee/departures"
            element={<DeparturesAirlineEmp />}
          />
        )}
        {user.role === "Airport Employee" && (
          <Route path="/airportemp/arrivals" element={<ArrivalsAirportEmp />} />
        )}
        {user.role === "Airport Employee" && (
          <Route
            path="/airportemp/departures"
            element={<DeparturesAirportEmp />}
          />
        )}
      </Routes>
    </div>
  );
};

export default Main;

{
  /* <GetCurrentTime getNewTime={setNewTime} getCurrTime={setCurrTime} /> */
}
{
  /* <GetCurrentTime getNewTime={getNewTime} /> */
}
{
  /* {user.role === "User" && getArrivals !== "departures" && <ArrivalsGeneralUsers />}
      {user.role === "User" && getArrivals === "departures" && <DeparturesGeneralUsers />}

      {user.role === "Airline Employee" && getArrivals !== "departures" && < ArrivalsAirlineEmp />}
      {user.role === "Airline Employee" && getArrivals === "departures" && < DeparturesAirlineEmp />} */
}
