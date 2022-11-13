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
const Main = () => {
  const [getArrivals, setGetArrivals] = useState("arrivals");
  // const [newTime, setNewTime] = useState("All flights");
  // const [curTime, setCurrTime] = useState();
  // console.log("Retrive flights for next  : ", newTime, "hours");
  // console.log("Current time: ", curTime);

  const handleArrivals = () => {
    console.log("from handleArrivals");
  };

  const handleDepartures = () => {
    console.log("from handleDepartures");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Welcome back {user.firstName}</h1>
        <p>({user.role})</p>
        <h2>Flight details...</h2>
        <span
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
              onClick={() => setGetArrivals("arrivals")}
              checked={getArrivals == "arrivals"}
              onChange={handleArrivals}
            />
          </span>
          <span style={{ marginLeft: "10px" }}>
            <label style={{ marginRight: "10px" }}>Departures</label>
            <input
              type="radio"
              name="departures"
              value={getArrivals}
              onClick={() => setGetArrivals("departures")}
              onChange={handleDepartures}
              checked={getArrivals == "departures"}
            />
          </span>
        </span>

        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      {/* <GetCurrentTime getNewTime={setNewTime} getCurrTime={setCurrTime} /> */}
      <GetCurrentTime />
      {user.role === "User" && getArrivals !== "departures" && <ArrivalsGeneralUsers />}
      {user.role === "User" && getArrivals === "departures" && <DeparturesGeneralUsers />}

      {user.role === "Airline Employee" && getArrivals !== "departures" && < ArrivalsAirlineEmp />}
      {user.role === "Airline Employee" && getArrivals === "departures" && < DeparturesAirlineEmp />}
    </div>
  );
};

export default Main;
