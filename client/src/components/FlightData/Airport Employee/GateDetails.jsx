import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import EnableDisableGate from "./DisableGate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "../../Main";

const GateDetails = () => {
  const navigate = useNavigate();
  const [Gates, setGates] = useState([]);

  useEffect(async (req, res) => {
    const gates = await axios.get("http://localhost:8080/api/gates/getgates");
    // console.log("Data:", gates.data);
    setGates(gates.data);
  }, []);

  const refreshPage = () => {
    window.location.reload();
    toast("Wow so easy!");
    // window.alert("Operation perfromed successfully");
  };
  // const notify = () => toast("Wow so easy!");

  // const gettingGates = async (req, res) => {
  //   const gates = await axios.get("http://localhost:8080/api/gates/getgates");
  //   // console.log("Data:", gates.data);
  //   setGates(gates.data);
  // };

  const enableGate = async (e) => {
    // console.log("Enable Gate ID : ", e.target.value);

    try {
      const url =
        "http://localhost:8080/api/gates/enable/gate/" + e.target.value;
      const GateToBeEnable = await axios.get(url);
      console.log("GateToBeEnable : ", GateToBeEnable);
    } catch (error) {
      window.alert("Error :", error);
    }
  };

  const NestedTable = () => {
    return (
      <div>
        <table>
          <thead>
            Nested Table
            <tr>
              <th>test</th>
              <th>test</th>
              <th>test</th>
              <th>test</th>
            </tr>
          </thead>
          <tbody>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Main />

      <ToastContainer />
      <div>
        <button
          style={{ marginRight: "15px", float: "left" }}
          onClick={() => navigate(-1)}
          className="btn btn-warning"
        >
          Go Back
        </button>
        <span style={{ marginRight: "10px", float: "right" }}>
          <EnableDisableGate />
        </span>
      </div>

      {Gates.map((gate) => {
        // console.log(gate);
      })}
      {
        <Table responsive>
          <thead>
            Arrivals Airport Employee
            <tr style={{ backgroundColor: "#3bb19b7a" }}>
              <th>Gate ID</th>
              <th>Gate Number</th>
              <th>Time From</th>
              <th>Time To</th>
              <th>Gate Status</th>
              <th>Flight ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Gates.map((gate) => {
              const jsonGate = JSON.stringify(gate);
              console.log("JSON GATE :", jsonGate);

              // {
              //   const jsonTest = () => {
              //     jsonGate.booking.map((gate) => {
              //       console.log("GATES...", gate);
              //     });
              //   };
              //   jsonTest();
              // }

              return (
                <tr>
                  <td>{gate._id}</td>
                  <td>{gate.gate_number}</td>
                  <td>{gate.booking.map((book) => book.time_from)}</td>
                  <td>{gate.booking.map((book) => book.time_to)}</td>
                  <td>{gate.booking.map((book) => book.gate_status)}</td>
                  <td>{gate.booking.map((book) => book.flight_id)}</td>
                  <td>
                    {gate.booking.map((book) => book.time_from).length > 0 &&
                    gate.booking.map((book) => book.gate_status) != "Booked" ? (
                      <Button
                        value={gate._id}
                        onClick={(e) => {
                          enableGate(e);
                          refreshPage();
                        }}
                        className="btn btn-success"
                      >
                        Enable Gate
                      </Button>
                    ) : (
                      <td></td>
                    )}
                  </td>
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
