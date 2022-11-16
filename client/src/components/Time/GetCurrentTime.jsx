import React, { useState } from "react";

const GetCurrentTime = () => {
    const [TimeViseFlights, setTimeViseFlights] = useState("All flights");

    var userTime = parseInt(TimeViseFlights, 10);

    // const getNewTimeFromMain = props.getNewTime;
    // console.log("Time from props :", getNewTimeFromMain)

    const date = new Date();

    var currHour = "0" + date.getHours();
    var newHour = "0" + (date.getHours() + userTime);

    if (newHour > 24) {
        newHour = newHour - 24;
    }

    var currMin = "0" + date.getMinutes();
    var newMin = "0" + date.getMinutes();

    var currTime = currHour.slice(-2) + ":" + currMin.slice(-2);
    var newTime = newHour.slice(-2) + ":" + newMin.slice(-2);

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
                {<option label="All Flights" value="All Flights"></option>}
                {<option label="Next 1 hour" value=" 1"></option>}
                {<option label="Next 2 hours" value="2"></option>}
                {<option label="Next 4 hours" value="4"></option>}
            </select>

            <p>Current Time = {currTime}</p>
            <p>New Time = {newTime}</p>
        </div>
    );
};

export default GetCurrentTime;
