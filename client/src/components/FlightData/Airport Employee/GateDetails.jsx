import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import EnableDisableGate from "./EnableDisableGate";
import Main from "../../Main";

const GateDetails = () => {
  const navigate = useNavigate();
  const [Gates, setGates] = useState([]);

  useEffect(async (req, res) => {
    const gates = await axios.get("http://localhost:8080/api/gates/getgates");
    // console.log("Data:", gates.data);
    setGates(gates.data);
  }, []);

  // const gettingGates = async (req, res) => {
  //   const gates = await axios.get("http://localhost:8080/api/gates/getgates");
  //   // console.log("Data:", gates.data);
  //   setGates(gates.data);
  // };

  return (
    <div>
      <Main />
      <div style={{ float: "right" }}>
        <button
          style={{ marginRight: "15px" }}
          onClick={() => navigate(-1)}
          className="btn btn-warning"
        >
          Go Back
        </button>
        <span style={{ marginRight: "15px" }}>
          <EnableDisableGate />
        </span>

        {/* <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={gettingGates}
        >
          Gates
        </button> */}
      </div>

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

// const gateDwtails = () => {
//   console.log("Hello from outside of the main function");
//   return (
//     <div>
//       {
//         <Table responsive>
//           <thead>
//             Arrivals Airport Employee
//             <tr>
//               <th>ID</th>
//               <th>Airline</th>
//               <th>Arriving From</th>
//               <th>Flight Type</th>
//               <th>time</th>
//               <th>Terminal</th>
//               <th>Gate</th>
//               <th>Baggage Claim</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr></tr>
//           </tbody>
//         </Table>
//       }
//     </div>
//   );
// };

export default GateDetails;
