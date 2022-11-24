import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

function AddFlightData() {
  const [flightType, setFlightType] = useState("");
  const [airline, setAirline] = useState("");
  const [arriving_from, setArriving_from] = useState("");
  const [time, setTime] = useState(new Date());
  const [terminal, setTerminal] = useState("");
  const [gate, setGate] = useState("");
  const [bag_claim, setBag_claim] = useState("");
  const [action, setAction] = useState("");

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setFlightType("");
    setAirline("");
    setArriving_from("");
    setTime(new Date());
    setGate("");
    setBag_claim("");
    setAction("");
  }, [show]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      airline,
      arriving_from,
      flight_type: flightType,
      time: moment(time).format("lll"),
      gate,
      terminal,
      bag_claim,
      action,
    };

    try {
      const url = "http://localhost:8080/api/flights";
      const { data: res } = await axios.post(url, obj);
      // navigate("/login");
      console.log(res.message);
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
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Flight Details</Modal.Title>
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
                  name="airline"
                  value={airline}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  type="string"
                  onChange={(e) => setAirline(e.target.value)}
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
                  value={arriving_from}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  type="string"
                  onChange={(e) => setArriving_from(e.target.value)}
                  autoFocus
                />
                <span
                  style={{
                    display: "flex",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Flight Type: </label>
                  <span>
                    <label style={{ marginRight: "10px" }}>Arriving</label>
                    <input
                      type="radio"
                      name="arriving"
                      value={flightType}
                      onClick={() => setFlightType("arriving")}
                      checked={flightType == "arriving"}
                    />
                  </span>
                  <span style={{ marginLeft: "10px" }}>
                    <label style={{ marginRight: "10px" }}>Departing</label>
                    <input
                      type="radio"
                      name="departing"
                      value={flightType}
                      onClick={() => setFlightType("departing")}
                      checked={flightType == "departing"}
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
                <DateTimePicker onChange={setTime} value={time} />
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
                  onChange={(e) => setTerminal(e.target.value)}
                  value={terminal}
                >
                  <option>Select Terminal</option>
                  <option label="T1" value="T1"></option>
                  <option label="T2" value="T2"></option>
                  <option label="T3" value="T3"></option>
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
                  value={gate}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  type="string"
                  onChange={(e) => setGate(e.target.value)}
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
                  value={bag_claim}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  type="string"
                  onChange={(e) => setBag_claim(e.target.value)}
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
                  value={action}
                  controlId="exampleForm.ControlInput1"
                  type="email"
                  onChange={(e) => setAction(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" variant="primary" onClick={refreshPage}>
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      {/* <button type="submit">add flight</button> */}
    </>
  );
}

export default AddFlightData;
// module.exports = { Example, handleChange };
