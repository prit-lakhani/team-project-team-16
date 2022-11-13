import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
const DeparturesGeneralUsers = () => {
    const [Flights, setFlightDetails] = useState([]);
    const [getArrivals, setGetArrivals] = useState("");
    const [filteredFlights, setFilteredFlights] = useState([]);
    const handleArrivals = () => {
        console.log("from handleArrivals");
    };

    const handleDepartures = () => {
        console.log("from handleDepartures");
    };

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
    useEffect(() => {
        getFlightDetails();
    }, []);

    return (
        <div>
            {
                <Table responsive>
                    <thead>
                        ArrivalsGeneralUsers
                        <tr>
                            <th>ID</th>
                            <th>Airline</th>
                            <th>Arriving From</th>
                            <th>Flight Type</th>
                            <th>time</th>
                            <th>Terminal</th>
                            <th>Gate</th>
                            <th>Baggage Claim</th>
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
                                    <td>{flight.bag_claim}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            }
        </div>
    );
};

export default DeparturesGeneralUsers;
