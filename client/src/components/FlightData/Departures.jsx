import React from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddFlightData from "./AddFlightDetails";

const Departures = () => {
  const [Flights, setFlightDetails] = useState([]);

  useEffect(() => {
    getFlightDetails();
  }, []);

  console.log("Flight from arrivals", Flights);

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

  const handleDeleteFlight = async (e) => {
    const IDToBeDeleted = e.target.value;
    console.log("IDToBeDeleted : ", IDToBeDeleted);
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/flights?id=" + IDToBeDeleted
      );
      if (response) {
        console.log("Success");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  console.log(Flights);
  {
    return (
      <Table responsive>
        <thead>
          Departures
          <AddFlightData />
          <tr>
            <th>ID</th>
            <th>Airline</th>
            <th>Departing to</th>
            <th>Flight Type</th>
            <th>Time</th>
            <th>Terminal</th>
            <th>Gate</th>
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
                {/* <td>{flight.bag_claim}</td> */}
                <td>
                  <button
                    name="edit"
                    value={flight._id}
                    onClick={(e) => {
                      // handleShow(e);
                      // handleUpdate(e);
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
};

export default Departures;
