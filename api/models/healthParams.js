const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthParamsSchema = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    hr: {
      type: Number,
      required: true,
    },
    temp: {
      type: Number,
      required: true,
    },
    },
    { timestamps: true }
);

HealthParamsSchema.statics.format = healthParams => {
  return {
    id: healthParams._id,
    hr: healthParams.hr,
    temp: healthParams.temp,
  };
};

module.exports = mongoose.model("HealthParams",  HealthParamsSchema);
