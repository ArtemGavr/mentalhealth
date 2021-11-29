const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const PatientIllnessSchema = new mongoose.Schema({
  illnessId: {
    type: Schema.Types.ObjectId,
    ref: "Illness",
    required: true,
  },
  date: { type: Date, default: today },
});

module.exports = mongoose.model("PatientIllness", PatientIllnessSchema);
