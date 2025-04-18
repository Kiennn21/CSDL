const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
    room_number: { type: String, required: true },
    room_type: { type: String, required: true },
    price_per_month: { type: Number, required: true },
    max_occupancy: { type: Number, required: true },

});

const Rooms = mongoose.model("Rooms", roomsSchema);

module.exports = Rooms;
