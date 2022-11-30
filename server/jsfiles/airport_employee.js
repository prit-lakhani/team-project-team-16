let Gates = require('../models/gates.model');
let Flights = require('../models/flights.model');


exports.get_gates = (req, res) => {
    Gates.find()
    .then(gates => res.json(gates))
    .catch(err => res.status(400).json('Error: ' + err));
};


exports.set_gates = (req,res) =>{
    let gate_status = req.body.gate_status;

    Gates.findOne({gate_num:req.body.gate_num,terminal:req.body.terminal})
    .exec()
    .then(this_gate => {
        
        if(this_gate.status==='Occupied'){
            res.status(409).json({"message":"This gate is currently Occupied"});
            return;
        }
        else{
            this_gate.gate_status = gate_status;
            this_gate.save()
              .then(() => res.json('Gate Status Modified'))
              .catch(err => res.status(400).json('Error: ' + err));
            return;
        }
    })
    .catch(err => res.status(404).json({error : 'Please provide correct terminal and gate info' }));
    return;     
};

exports.get_flights = (req,res)=> {
    Flights.find({arr_dep:'arrival'})
    .exec()
    .then(flights=>{
        res.json(flights);
        return;
    })
    .catch(err => res.status(400).json('Error: ' + err));
    return;
};



exports.set_baggage = (req,res) => {
    Flights.find({baggage:req.body.baggage})
    .exec()
    .then(baggageclaim => {
        if(baggageclaim.length<4){
            Flights.find({flight_num:req.body.flight_num, arr_dep:'arrival'})
            .exec()
            .then(flights => {
                if (flights.length >0){
                    let this_flight = flights[0];
                    if(this_flight.baggage===undefined){
                        this_flight.baggage = req.body.baggage;
                        this_flight.save()
                        .then(() => res.json('Baggage Assigned Successfully'))
                        .catch(err => res.status(400).json({'Some Error':err}));
                        return;
                    }else{
                        res.status(409).json({error:'This Flight has already been assigned a baggage counter'});
                        return;
                    }
                   
                }else{
                    res.status(400).json({'Error':'Please re-enter the correct flight information'});
                }
                return; 
            })
            .catch(err => res.status(400).json({'Error': err}));
            return;

        }
        else{
            res.status(409).json({error:'This baggage counter has already been assigned to 4 flights. Please assign another counter'});
            return;

        }
    })
    
};