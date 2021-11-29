const mongoose = require("mongoose");

const IllnessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    severity: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

IllnessSchema.statics.format = illness => {
  return {
   name: illness.name,
   severity: illness.severity,
  };
};

module.exports = mongoose.model("Illness", IllnessSchema);