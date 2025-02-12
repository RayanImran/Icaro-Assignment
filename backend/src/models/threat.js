import mongoose from "mongoose";

const ThreatSchema = new mongoose.Schema({
  host: { type: String, required: true },
  url: { type: String, required: true },
  threat_type: { type: String, required: true },
  date_added: { type: String, required: true },
});

const Threat = mongoose.model("Threat", ThreatSchema);
export default Threat;
