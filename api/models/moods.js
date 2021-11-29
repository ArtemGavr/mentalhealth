const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoodSchema = new mongoose.Schema(
  {
    diaries: {
      type: Schema.Types.ObjectId,
      ref: "Diaries",
      required: true,
    },
    stress: {
      type: Number,
      required: true,
    },
    anxiety: {
      type: Number,
      required: true,
    },
    depression: {
      type: Number,
      required: true,
    },
    general: {
        type: Number,
        required: true,
      },
    happiness: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

MoodSchema.statics.format = mood => {
  return {
    stress: mood.stress,
    anxiety: mood.anxiety,
    depression: mood.depression,
    general: mood.general,
    happiness: mood.happiness,
  };
};

module.exports = mongoose.model("Mood", MoodSchema);