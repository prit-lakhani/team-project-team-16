import React from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddFlightData from "../AddFlightDetails";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


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
            const url =
                "http://localhost:8080/api/flights/update/" + obj.UpdateAirline_ID;
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
            const url = "http://localhost:8080/api/flights/update/" + IDToBeUpdated;
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
        window.location.reload("/departures");
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

    console.log(Flights);
    {
        return (
            <div>
                <select
                    name="timeViseFlightRetrivals"
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
                                    <label>Time</label>
                                    <br />
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        {/* <Form.Control
                                            name="time"
                                            value={UpdateTime}
                                            className="mb-3"
                                            controlId="exampleForm.ControlInput1"
                                            type="string"
                                            autoFocus
                                            onChange={(e) => setUpdateTime(e.target.value)}
                                        /> */}
                                        <DateTimePicker className="mb-3" onChange={setUpdateTime} value={UpdateTime} />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label>Terminal</Form.Label>

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

                                        {/* <p>Terminal : {data.Terminal}</p> */}
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label>Gate</Form.Label>
                                        <Form.Control
                                            name="gate"
                                            value={UpdateGate}
                                            className="mb-3"
                                            controlId="exampleForm.ControlInput1"
                                            type="string"
                                            onChange={(e) => setUpdateGate(e.target.value)}
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label>Baggae Claim</Form.Label>
                                        <Form.Control
                                            name="bag_claim"
                                            value={UpdateBagClaim}
                                            className="mb-3"
                                            controlId="exampleForm.ControlInput1"
                                            type="string"
                                            onChange={(e) => setUpdateBagClaim(e.target.value)}
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label>Action</Form.Label>
                                        <Form.Control
                                            className="mb-3"
                                            name="action"
                                            value={UpdateAction}
                                            controlId="exampleForm.ControlInput1"
                                            type="email"
                                            onChange={(e) => setUpdateAction(e.target.value)}
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <button type="submit" variant="primary">
                                    Update
                                </button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                }

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
                                    <td>
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
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
};

export default DeparturesAirlineEmp;
