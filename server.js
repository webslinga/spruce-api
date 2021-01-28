const express = require('express');
const cors = require('cors');
let app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let db = mongoose.connect('mongodb://localhost/spruce-api');

const Event = require('./model/event');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Event Endpoints
app.post("/event/add", async (request, response) => {
    try {
        let event = new Event();
        event.title = request.body.title;
        event.date = request.body.date;
        event.time = request.body.time;
        event.location = request.body.location;
        event.type = request.body.type;
        event.featured = request.body.featured;
        event.description = request.body.description;

        var result = await event.save();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/event/update/:id", async (request, response) => {
    try {
        var event = await Event.findById(request.params.id).exec();
        event.set(request.body);
        var result = await event.save();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/event/delete/:id", async (request, response) => {
    try {
        var result = await Event.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/events", async (request, response) => {
    try {
        var result = await Event.find().exec();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/event/:id", async (request, response) => {
    try {
        var result = await Event.findById({ _id: request.params.id }).exec();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3005, function() {
  console.log('API running on port 3005...');
});
