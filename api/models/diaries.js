const mongoose = require("mongoose");
const MoodSchema = require("./moods").schema;
const Schema = mongoose.Schema;

const DiariesSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
   moods: [MoodSchema],
  },
    { timestamps: true }
);

DiariesSchema.statics.format = diaries => {
  return {
    id: diaries._id,
    note: diaries.note,
    moods: diaries.moods,
  };
};

module.exports = mongoose.model("Diaries",  DiariesSchema);
