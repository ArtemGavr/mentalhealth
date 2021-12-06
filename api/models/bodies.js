const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BodiesSchema = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    sex: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

BodiesSchema.statics.format = bodies => {
  return {
    weight: bodies.weight,
    sex: bodies.sex,
    height: bodies.height,
  };
};

module.exports = mongoose.model("Bodies", BodiesSchema);
