import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Link, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Arrivals from "../Arrivals";
import Departures from "../Departures";
import GeneralUsers from "../GeneralUsers/FlightsGeneralUsers";
import AddFlightData from "../AddFlightDetails";
import GetCurrentTime from "../../Time/GetCurrentTime";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";

const ArrivalsAirlineEmp = () => {
    const [Flights, setFlightDetails] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [UpdateAirline, setUpdateAirline] = useState("");
    const [UpdateArrivinFrom, setUpdateArrivinFrom] = useState("");
    const [UpdateFlightType, setUpdateFlightType] = useState("");
    const [UpdateTime, setUpdateTime] = useState(new Date());
    const [UpdateTerminal, setUpdateTerminal] = useState("");
    const [UpdateGate, setUpdateGate] = useState("");
    const [UpdateBagClaim, setUpdateBagClaim] = useState("");
    const [UpdateAction, setUpdateAction] = useState("");
    const [UpdateAirline_ID, setUpdateID] = useState("");

    // const [time_from, setTime_from] = useState(new Date());
    // const [time_to, setTime_to] = useState("");

    // const [gate_number, setGate_number] = useState("");
    // const [gate_status, setGate_status] = useState("");

    // const [TimeViseFlights, setTimeViseFlights] = useState("All flights");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    // console.log("Flight from arrivals", Flights);

    const getFlightDetails = async (req, res) => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/flights/arrivals"
            );
            console.log("Getting data from flights api", response.data[0]);
            setFlightDetails(response.data);
            // setFilteredFlights(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // const getGate = async (flightId) => {
    //     try {
    //         const response = await axios.get(
    //             "http://localhost:8080/api/gates/getgate/" + flightId
    //         );
    //         return response.data.gate;
    //     } catch (error) {
    //         console.log(error);
    //         return "";
    //     }
    // };

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

    const handleDeleteGate = async (e) => {
        const FlightIDToBeDeleted = e.target.value;
        console.log("GateIDToBeDeleted :", FlightIDToBeDeleted);
        try {
            const response = await axios.get(
                "http://localhost:8080/api/flights/getgates/" + FlightIDToBeDeleted
            );
            if (response) {
                console.log("Gate details : ", response.data);
            }
        } catch (error) {
            console.log("Error", error);
        }

    };

    const refreshPage = () => {
        window.location.reload();
    };

    const [TimeViseFlights, setTimeViseFlights] = useState("0");

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
        // moment(UpdateTime).format("lll")
        var start_time = moment(flightT.time);
        var end_time = start_time;

        end_time = moment(start_time).add(1, "hours");
        // moment(end_time).format("lll")
        const start = moment(start_time).format("lll");
        const end = moment(end_time).format("lll");
        // end_time.add(1, "h");
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
            const url = "http://localhost:8080/api/gates/random/assign";
            await axios.post(url, gateObj);
            console.log("hello");
            // res.send({ message: "Hello from random/assign" });

            // const url2 = "http://localhost:8080/api/flights/update/gate/" + flightT._id;
            // const { data: res2 } = await axios.post(url2, {
            //     gate: res.gateNum,
            // });

            // console.log("Res 2", res2);
        } catch (error) {
            console.log(error);
        }
    };

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
                                    <label>Time</label>
                                    <br />
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <DateTimePicker
                                            className="mb-3"
                                            onChange={setUpdateTime}
                                            value={UpdateTime}
                                        />
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
                        ArrivalsAirlineEmployees
                        <AddFlightData />
                        <tr>
                            <th>ID</th>
                            <th>Airline</th>
                            <th>Arriving From</th>
                            <th>Flight Type</th>
                            <th>time</th>
                            <th>Terminal</th>
                            <th>Gate</th>
                            <th>Baggage Claim</th>
                            <th>Action</th>
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
                                    <td>
                                        <button
                                            className="btn btn-warning"
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
                                            className="btn btn-danger"
                                            name="delete"
                                            id={flight._id}
                                            value={flight._id}
                                            onClick={(e) => {
                                                handleDeleteFlight(e);
                                                handleDeleteGate(e);
                                                // refreshPage();
                                            }}
                                        >
                                            Delete
                                        </button>
                                        {flight.gate === "" ? (
                                            <button
                                                className="btn btn-info"
                                                name="assign"
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
        );
    }
};

export default ArrivalsAirlineEmp;
