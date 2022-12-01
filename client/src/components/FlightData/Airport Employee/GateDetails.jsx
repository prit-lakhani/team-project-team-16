import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Badge } from "react-bootstrap";
import EnableDisableGate from "./DisableGate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "../../Main";

const GateDetails = () => {
  const navigate = useNavigate();
  const [Gates, setGates] = useState([]);
  const [getGateId, setgetGateId] = useState("");
  const [getBookId, setgetBookId] = useState("");

  const handleButtonclick = () => {
    setgetGateId();
    setgetBookId();
  };

  useEffect(async (req, res) => {
    const gates = await axios.get("http://localhost:8080/api/gates/getgates");
    // console.log("Data:", gates.data);
    setGates(gates.data);
  }, []);

  const badgeStyle = {
    backgroundColor: "light green",
  };

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

  const enableGate = async (book, gate) => {
    console.log("Enable Gate ID : ", book._id, gate._id);
    const sendData = {
      bookid: book._id,
      gateid: gate._id,
    };

    try {
      const url = "http://localhost:8080/api/gates/enable/gate/" + gate._id;

      const GateToBeEnable = await axios.post(url, {
        sendData,
      });
      console.log("GateToBeEnable : ", GateToBeEnable);
    } catch (error) {
      window.alert("Error :", error);
    }
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
        <span
          style={{ marginRight: "10px", float: "right", marginLeft: "10px" }}
        >
          <EnableDisableGate />
        </span>
      </div>

      {Gates.map((gate) => {
        // console.log(gate);
      })}
      {
        <Table responsive bordered>
          <thead>
            {/* Arrivals Airport Employee */}
            <tr style={{ backgroundColor: "#3bb19b7a" }}>
              <th>Gate ID</th>
              <th>Number</th>
              <th>Time From</th>
              <th>Time To</th>
              <th>Gate Status</th>
              <th>Booking ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Gates.map((gate) => {
              // const jsonGate = JSON.stringify(gate);

              if (gate.booking.length > 1) {
                return (
                  <tr>
                    <td>{gate._id.slice(-6)}</td>
                    <td>{gate.gate_number}</td>
                    <td colSpan={5}>
                      <Table responsive bordered>
                        <thead>
                          <tr style={{ backgroundColor: "#3bb19b7a" }}>
                            <th>Time From</th>
                            <th>Time To</th>
                            <th>Gate Status</th>
                            <th>Book Id</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gate.booking.map((book) => (
                            <tr>
                              <td>{book.time_from}</td>
                              <td>{book.time_to}</td>
                              <td>
                                <Badge bg="secondary">{book.gate_status}</Badge>
                              </td>
                              <td>{book._id && book._id.slice(-6)}</td>
                              <td>
                                {book.time_from.length > 0 &&
                                book.gate_status != "Booked" ? (
                                  <Button
                                    onClick={() => {
                                      enableGate(book, gate);
                                      refreshPage();
                                    }}
                                    className="btn btn-success"
                                  >
                                    Enable Gate
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr>
                    <td>{gate._id.slice(-6)}</td>
                    <td>{gate.gate_number}</td>
                    <td>{gate.booking.map((book) => book.time_from)}</td>
                    <td>{gate.booking.map((book) => book.time_to)}</td>
                    <td>
                      {gate.booking.map((book) => (
                        <Badge bg="secondary" style={badgeStyle}>
                          {book.gate_status}
                        </Badge>
                      ))}
                    </td>
                    <td>
                      {gate.booking.map(
                        (book) => book.flight_id && book.flight_id.slice(-6)
                      )}
                    </td>
                    <td>
                      {gate.booking.map((book) => book.time_from).length > 0 &&
                      gate.booking.map((book) => book.gate_status) !=
                        "Booked" ? (
                        <Button
                          onClick={() => {
                            var book2;
                            gate.booking.map((book) => (book2 = book));
                            enableGate(book2, gate);
                            refreshPage();
                          }}
                          className="btn btn-success"
                        >
                          Enable Gate
                        </Button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      }
    </div>
  );
};

export default GateDetails;
