const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const UserIllnessSchema = new mongoose.Schema({
  illnessId: {
    type: Schema.Types.ObjectId,
    ref: "Ilness",
    required: true,
  },
  stage: {
    type: Number,
    required: true
  },
  date: { type: Date, default: today },
});

module.exports = mongoose.model("UserIllness", UserIllnessSchema);
