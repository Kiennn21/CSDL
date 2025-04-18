const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  service_id: { type: String, required: true },
  service_name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
