import React from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddFlightData from "../AddFlightDetails";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import dynamicURL from "../../../Utils/urlConfig";

const DeparturesAirlineEmp = () => {
  const [Flights, setFlightDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [UpdateAirline, setUpdateAirline] = useState("");
  const [UpdateArrivinFrom, setUpdateArrivinFrom] = useState("");
  const [UpdateFlightType, setUpdateFlightType] = useState("");
  const [UpdateTime, setUpdateTime] = useState("");
  const [UpdateTerminal, setUpdateTerminal] = useState("");
  const [UpdateGate, setUpdateGate] = useState("");
  const [UpdateBagClaim, setUpdateBagClaim] = useState("");
  const [UpdateAction, setUpdateAction] = useState("");
  const [UpdateAirline_ID, setUpdateID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [TimeViseFlights, setTimeViseFlights] = useState("0");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      UpdateAirline_ID,
      UpdateAirline,
      UpdateArrivinFrom,
      UpdateFlightType,
      UpdateTime: moment(UpdateTime).format("lll"),
      UpdateGate,
      UpdateTerminal,
      UpdateBagClaim,
      UpdateAction,
    };
    console.log("Update data : ", obj);
    try {
      const url = `${dynamicURL}/api/flights/update/` + obj.UpdateAirline_ID;
      const { data: res } = axios.post(url, obj);
      console.log("From handle Data :", res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    handleClose();
  };

  const handleUpdate = async (e) => {
    try {
      const IDToBeUpdated = e.target.value;
      console.log("IDToBeUpdated : ", IDToBeUpdated);
      const url = `${dynamicURL}/api/flights/update/` + IDToBeUpdated;
      const DataToBeUpdated = await axios.get(url);
      if (DataToBeUpdated) {
        console.log("Data to be updated", DataToBeUpdated.data.airline);
        setUpdateID(IDToBeUpdated);
        setUpdateAirline(DataToBeUpdated.data.airline);
        setUpdateArrivinFrom(DataToBeUpdated.data.arriving_from);
        setUpdateFlightType(DataToBeUpdated.data.flight_type);
        setUpdateTime(moment(DataToBeUpdated.data.time, "lll").toDate());
        setUpdateTerminal(DataToBeUpdated.data.terminal);
        setUpdateGate(DataToBeUpdated.data.gate);
        setUpdateBagClaim(DataToBeUpdated.data.bag_claim);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getFlightDetails();
  }, []);

  console.log("Flight from arrivals", Flights);

  const getFlightDetails = async (req, res) => {
    try {
      const response = await axios.get(`${dynamicURL}/api/flights/departures`);
      console.log("Getting data from flights api", response.data[0]);
      setFlightDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFlight = async (e) => {
    const IDToBeDeleted = e.target.value;
    console.log("IDToBeDeleted : ", IDToBeDeleted);
    try {
      const response = await axios.delete(
        `${dynamicURL}/api/flights?id=` + IDToBeDeleted
      );
      if (response) {
        console.log("Success");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshPage = () => {
    window.location.reload("/departures");
  };

  const handleDeleteGate = async (e) => {
    const FlightIDToBeDeleted = e.target.value;
    console.log("GateIDToBeDeleted :", FlightIDToBeDeleted);
    try {
      const response = await axios.get(
        `${dynamicURL}/api/flights/getgates/` + FlightIDToBeDeleted
      );
      if (response) {
        console.log("Gate details : ", response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

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

  const assignGate = async (flightT) => {
    var start_time = moment(flightT.time);
    var end_time = start_time;

    end_time = moment(start_time).add(1, "hours");

    const start = moment(start_time).format("lll");
    const end = moment(end_time).format("lll");

    console.log("assignGate function ....");
    const gateObj = {
      terminal: flightT.terminal,
      flight_type: flightT.flight_type,
      time: start,
      end: end,
      airline: flightT.airline,
      flight_id: flightT._id,
    };
    console.log("Gate OBJECT", gateObj);
    console.log("Flight ID to be updated(Gate number) : ", flightT._id);

    try {
      const url = `${dynamicURL}/api/gates/random/assign`;
      await axios.post(url, gateObj);
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    display: "flex",
    justifyContent: "space-evenly",
  };

  console.log(Flights);
  {
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

        {
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Flight Details</Modal.Title>
            </Modal.Header>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                refreshPage();
              }}
            >
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Airline</Form.Label>
                    <Form.Control
                      name="UpdateAirline_ID"
                      type="string"
                      hidden="true"
                      value={UpdateAirline_ID}
                      className="mb-3"
                      onChange={(e) => setUpdateID(e.target.value)}
                      autoFocus
                    />

                    <Form.Control
                      name="airline"
                      value={UpdateAirline}
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                      type="string"
                      onChange={(e) => setUpdateAirline(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Arriving From/ Departing To</Form.Label>
                    <Form.Control
                      name="arriving_from"
                      value={UpdateArrivinFrom}
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                      type="string"
                      onChange={(e) => setUpdateArrivinFrom(e.target.value)}
                      autoFocus
                    />
                    <span
                      style={{
                        display: "flex",
                      }}
                    >
                      <label style={{ marginRight: "10px" }}>
                        Flight Type:{" "}
                      </label>
                      <span>
                        <label style={{ marginRight: "10px" }}>Arriving</label>
                        <input
                          type="radio"
                          name="arriving"
                          checked={UpdateFlightType === "arriving"}
                          value={UpdateFlightType}
                          onClick={() => setUpdateFlightType("arriving")}
                        />
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        <label style={{ marginRight: "10px" }}>Departing</label>
                        <input
                          type="radio"
                          name="departing"
                          checked={UpdateFlightType === "departing"}
                          value={UpdateFlightType}
                          onClick={() => setUpdateFlightType("departing")}
                        />
                      </span>
                    </span>
                  </Form.Group>
                  <span style={{ display: "flex" }}>
                    <label>Time : </label>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <span style={{ marginLeft: "10px" }}>
                        <DateTimePicker
                          className="mb-3"
                          onChange={setUpdateTime}
                          value={UpdateTime}
                        />
                      </span>
                    </Form.Group>
                  </span>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Terminal : </Form.Label>
                    <span style={{ marginLeft: "10px" }}>
                      <select
                        name="terminal"
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                        onChange={(e) => setUpdateTerminal(e.target.value)}
                        value={UpdateTerminal}
                      >
                        <option>Select Terminal</option>
                        {<option label="T1" value="T1"></option>}
                        {<option label="T2" value="T2"></option>}
                        {<option label="T3" value="T3"></option>}
                      </select>
                    </span>
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <button
                  type="submit"
                  variant="primary"
                  className="btn btn-success"
                >
                  Update
                </button>
              </Modal.Footer>
            </form>
          </Modal>
        }
        <span
          style={{ float: "right", marginRight: "15px", marginTop: "-20px" }}
        >
          <AddFlightData />
        </span>
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <Table responsive bordered striped>
            <thead>
              <tr style={{ backgroundColor: "#3bb19b7a" }}>
                <th>ID</th>
                <th>Airline</th>
                <th>Departing to</th>
                <th>Flight Type</th>
                <th>Time</th>
                <th>Terminal</th>
                <th>Gate</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Flights.map((flight) => {
                const formatted_id = flight._id.slice(-6).toUpperCase();
                return !checkTime(TimeViseFlights, flight.time) ? (
                  <tr></tr>
                ) : (
                  <tr>
                    <td>{formatted_id}</td>
                    <td>{flight.airline}</td>
                    <td>{flight.arriving_from}</td>
                    <td>{flight.flight_type}</td>
                    <td>{flight.time}</td>
                    <td>{flight.terminal}</td>
                    <td>{flight.gate}</td>
                    <td style={styles}>
                      <button
                        name="edit"
                        className="btn btn-warning"
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
                        className="btn btn-danger"
                        id={flight._id}
                        value={flight._id}
                        onClick={(e) => {
                          handleDeleteFlight(e);
                          handleDeleteGate(e);
                          refreshPage();
                        }}
                      >
                        Delete
                      </button>
                      {flight.gate == "" ? (
                        <button
                          name="assign"
                          className="btn btn-info"
                          id={flight._id}
                          value={flight._id}
                          onClick={(e) => {
                            assignGate(flight).then((res) => {
                              refreshPage();
                            });
                          }}
                        >
                          Assign Gate
                        </button>
                      ) : (
                        <p></p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
};

export default DeparturesAirlineEmp;
