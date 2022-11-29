import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { Alert } from "bootstrap";

const EnableDisableGate = () => {
  const [flightType, setFlightType] = useState("");
  const [selectedGate, setselectedGate] = useState("");
  const [arriving_from, setArriving_from] = useState("");
  const [startTime, setstartTime] = useState(new Date());
  const [endTime, setendTime] = useState(new Date());

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
    setselectedGate("");
    setArriving_from("");
    setstartTime(new Date());
    setendTime(new Date());

    setGate("");
    setBag_claim("");
    setAction("");
  }, [show]);

  const allGates = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
    "A16",
    "A17",
    "A18",
    "A19",
    "A20",
    "A21",
    "A22",
    "A23",
    "A24",
    "A25",
    "A26",
    "A27",
    "A28",
    "A29",
    "A30",
    "A31",
    "A32",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
    "B15",
    "B16",
    "B17",
    "B18",
    "B19",
    "B20",
    "B21",
    "B22",
    "B23",
    "B24",
    "B25",
    "B26",
    "B27",
    "B28",
    "B29",
    "B30",
    "B31",
    "B32",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "C11",
    "C12",
    "C13",
    "C14",
    "C15",
    "C16",
    "C17",
    "C18",
    "C19",
    "C20",
    "C21",
    "C22",
    "C23",
    "C24",
    "C25",
    "C26",
    "C27",
    "C28",
    "C29",
    "C30",
    "C31",
    "C32",
  ];
  const navigate = useNavigate();
  const isValidGate = () => {
    allGates.forEach((gate) => {
      if (selectedGate === gate) {
        console.log("Valid gate");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("GateNUMBER : ", selectedGate);
    console.log("Time from :", startTime);
    console.log("Time from :", endTime);

    const disableGate = async (flightT) => {
      console.log("disable function ....");
      const gateObj = {
        startTime: moment(startTime).format("lll"),
        endTime: moment(endTime).format("lll"),
        selectedGate,
      };

      try {
        const url = "http://localhost:8080/api/gates/disable/gate";
        await axios.post(url, gateObj);
      } catch (error) {
        window.alert("Error", error);
        console.log(error);
      }
    };

    disableGate();
    isValidGate();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Enable/Disable Gate
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Gate Details</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            isValidGate(e);
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
                <Form.Label>Gate</Form.Label>
                <Form.Control
                  name="selectedGate"
                  value={selectedGate}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  type="string"
                  onChange={(e) => setselectedGate(e.target.value)}
                  autoFocus
                />
              </Form.Group>

              <label>Start Time </label>
              <br />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <DateTimePicker onChange={setstartTime} value={startTime} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <label>End Time </label>
                <br />
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <DateTimePicker onChange={setendTime} value={endTime} />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                ></Form.Group>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" variant="primary" value={selectedGate}>
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EnableDisableGate;
