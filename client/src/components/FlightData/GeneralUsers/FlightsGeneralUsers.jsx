import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddFlightDetails from "../AddFlightDetails";
import { Table, Button, Link } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import AddFlightData from "../AddFlightDetails";
import Arrivals from "../Arrivals";
import Departures from "../Departures";

const GeneralUsers = () => {
  const [Flights, setFlightDetails] = useState([]);
  const [getArrivals, setGetArrivals] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const handleArrivals = () => {
    console.log("from handleArrivals");
  };

  const handleDepartures = () => {
    console.log("from handleDepartures");
  };

  const getFlightDetails = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:8080/api/flights");
      console.log("Getting data from flights api", response.data[0]);
      setFlightDetails(response.data);
      setFilteredFlights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFlightDetails();
  }, []);

  return (
    <div>
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

      {getArrivals == "departures" ? <Departures /> : <Arrivals />}

      {
        <Table responsive>
          <thead>
            {/* <AddFlightData /> */}
            GeneralUsers
            <tr style={{ backgroundColor: "#3bb19b7a" }}>
              <th>ID</th>
              <th>Airline</th>
              <th>Arriving From</th>
              <th>Flight Type</th>
              <th>time</th>
              <th>Terminal</th>
              <th>Gate</th>
              <th>Baggage Claim</th>
              <th>Action</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Flights.map((flight) => {
              const formatted_id = flight._id.slice(-6).toUpperCase();
              return (
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
                  {/* <td>
                    <button
                      name="edit"
                      value={flight._id}
                      onClick={(e) => {
                        handleShow(e);
                        handleUpdate(e);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      name="delete"
                      id={flight._id}
                      value={flight._id}
                      onClick={(e) => {
                        handleDeleteFlight(e);
                        refreshPage();
                      }}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </div>
  );
};

export default GeneralUsers;
