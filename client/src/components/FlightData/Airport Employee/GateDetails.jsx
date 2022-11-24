import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const GateDetails = () => {
  const navigate = useNavigate();
  const [Gates, setGates] = useState([]);

  const gettingGates = async (req, res) => {
    const gates = await axios.get("http://localhost:8080/api/gates/getgates");
    // console.log("Data:", gates.data);
    setGates(gates.data);
  };

  return (
    <div>
      <div>Gate Details </div>
      <h1 style={{ color: "green" }}>A Computer Science portal for geeks.</h1>
      <button onClick={() => navigate(-1)}>Go Back Home</button>
      <button onClick={gettingGates}>Gates</button>
      {/* {JSON.stringify(Gates)} */}
      {Gates.map((gate) => {
        console.log(gate);
      })}
      {
        <Table responsive>
          <thead>
            Arrivals Airport Employee
            <tr>
              <th>Gate ID</th>
              <th>Gate Number</th>
              <th>Time From</th>
              <th>Time To</th>
              <th>Gate Status</th>
              <th>Flight ID</th>
            </tr>
          </thead>
          <tbody>
            {Gates.map((gate) => {
              return (
                <tr>
                  <td>{gate._id}</td>
                  <td>{gate.gate_number}</td>

                  <td>{gate.booking.map((book) => book.time_from)}</td>
                  <td>{gate.booking.map((book) => book.time_to)}</td>
                  <td>{gate.booking.map((book) => book.gate_status)}</td>
                  <td>{gate.booking.map((book) => book.flight_id)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </div>
  );
};

const gateDwtails = () => {
  console.log("Hello from outside of the main function");
  return (
    <div>
      {
        <Table responsive>
          <thead>
            Arrivals Airport Employee
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Arriving From</th>
              <th>Flight Type</th>
              <th>time</th>
              <th>Terminal</th>
              <th>Gate</th>
              <th>Baggage Claim</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{i}</td>
              <td>{formatted_id}</td>
              <td>{flight.airline}</td>
              <td>{flight.arriving_from}</td>
              <td>{flight.flight_type}</td>
              <td>{flight.time}</td>
              <td>{flight.terminal}</td>
              <td>{flight.gate}</td>
              <td>{flight.bag_claim}</td> */}
            </tr>
          </tbody>
        </Table>
      }
    </div>
  );
};

export default GateDetails;
