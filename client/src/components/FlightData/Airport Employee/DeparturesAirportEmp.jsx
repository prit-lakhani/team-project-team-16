import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const DeparturesAirportEmp = () => {
  const [Flights, setFlightDetails] = useState([]);
  const [getArrivals, setGetArrivals] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [TimeViseFlights, setTimeViseFlights] = useState("0");

  const handleArrivals = () => {
    console.log("from handleArrivals");
  };

  const handleDepartures = () => {
    console.log("from handleDepartures");
  };

  const getFlightDetails = async (req, res) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/flights/departures"
      );
      console.log("Getting data from flights api", response.data[0]);
      setFlightDetails(response.data);
      // setFilteredFlights(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFlightDetails();
  }, []);
  const checkTime = (userTime, flightTime) => {
    var pTime = parseInt(userTime, 10);
    if (pTime <= 0) {
      return true;
    }
    console.log("userTime :", userTime);

    let now = moment();
    console.log("Now :", now.format("HH:DD"));

    let user = moment();
    user.add(pTime, "h");
    console.log("user :", user.format("HH:DD"));

    let flight = moment(flightTime, "lll");
    if (!flight.isValid()) {
      return false;
    }

    console.log("flight :", flight.format("HH:DD"));

    if (flight.isSameOrAfter(now) && flight.isSameOrBefore(user)) {
      console.log("Can display these flights");
      return true;
    } else {
      console.log("No flights found for this time duration");
      return false;
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <select
        name="timeWiseFlightRetrivals"
        className="mb-3"
        controlId="exampleForm.ControlInput1"
        onChange={(e) => setTimeViseFlights(e.target.value)}
        value={TimeViseFlights}
      >
        <option>Select option to retrive flights</option>
        {<option label="All Flights" value="0"></option>}
        {<option label="Next 1 hour" value="1"></option>}
        {<option label="Next 2 hours" value="2"></option>}
        {<option label="Next 4 hours" value="4"></option>}
      </select>
      <button
        style={{ float: "right", marginRight: "15px" }}
        className="btn btn-info"
        onClick={() => navigate("/GateDetails")}
      >
        Gate details
      </button>
      {
        <Table responsive>
          <thead>
            Departures Airport Employee
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Arriving From</th>
              <th>Flight Type</th>
              <th>time</th>
              <th>Terminal</th>
              <th>Gate</th>
            </tr>
          </thead>
          <tbody>
            {Flights.map((flight) => {
              const formatted_id = flight._id.slice(-6).toUpperCase();
              return !checkTime(TimeViseFlights, flight.time) ? (
                <tr></tr>
              ) : (
                <tr>
                  {/* <td>{i}</td> */}
                  <td>{formatted_id}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.arriving_from}</td>
                  <td>{flight.flight_type}</td>
                  <td>{flight.time}</td>
                  <td>{flight.terminal}</td>
                  <td>{flight.gate}</td>
                  {/* <td>{flight.bag_claim}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </div>
  );
};

export default DeparturesAirportEmp;
