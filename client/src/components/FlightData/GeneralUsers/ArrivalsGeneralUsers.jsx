import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Arrivals from "../Arrivals";
import Departures from "../Departures";
import DeparturesGeneralUsers from "./DeparturesGeneralUsers";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "/Users/spartan/Desktop/202-new/team-project-team-16/client/src/components/Main/custom.css";
import dynamicURL from "../../../Utils/urlConfig";

const ArrivalsGeneralUsers = () => {
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
      const response = await axios.get(`${dynamicURL}/api/flights/arrivals`);
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

  const myCss = {
    color: "black",
  };

  return (
    <div>
      <select
        name="timeWiseFlightRetrivals"
        className="custom-css"
        controlId="exampleForm.ControlInput1"
        onChange={(e) => setTimeViseFlights(e.target.value)}
        value={TimeViseFlights}
      >
        <option>Select option to retrive flights</option>
        {<option style={myCss} label="All Flights" value="0"></option>}
        {<option label="Next 1 hour" value="1"></option>}
        {<option label="Next 2 hours" value="2"></option>}
        {<option label="Next 4 hours" value="4"></option>}
      </select>

      {
        <div
          style={{ marginLeft: "20px", marginRight: "20px", marginTop: "10px" }}
        >
          <Table responsive bordered striped>
            <thead>
              {/* ArrivalsGeneralUsers */}
              <tr style={{ backgroundColor: "#3bb19b7a" }}>
                <th>ID</th>
                <th>Airline</th>
                <th>Arriving From</th>
                <th>Flight Type</th>
                <th>time</th>
                <th>Terminal</th>
                <th>Gate</th>
                <th>Baggage Claim</th>
                {/* <th></th>
              <th></th> */}
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
                    <td>{flight.bag_claim}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      }
    </div>
  );
};

export default ArrivalsGeneralUsers;
