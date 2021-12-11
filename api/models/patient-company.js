const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const PatientCompanySchema = new mongoose.Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  startDate: { type: Date, default: today },
});

module.exports = mongoose.model("PatientCompany", PatientCompanySchema);
