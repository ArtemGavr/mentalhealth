const mongoose = require("mongoose");
const BodiesSchema = require("./bodies").schema;
const PatientDiariesSchema = require("./diaries").schema;
const PatientIllnessSchema = require("./patient-illness").schema;
const PatientCompanySchema = require("./patient-company").schema;
const dayjs = require("dayjs");

const PatientSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      jobTitle: {
        type: String,
        required: true,
      },
      roles: {
        type: Array,
        default: ["user"],
      },
      birthDate: {
        type: { type: Date}
      },
      bodies: [BodiesSchema],
      patientCompany: [PatientCompanySchema],
      illness: [PatientIllnessSchema],
      patientDiaries: [PatientDiariesSchema],
    },
    {timestamps: true}
);

PatientSchema.statics.format = patient => {
  return {
    id: patient._id,
    email: patient.email,
    name: patient.name,
    surname: patient.surname,
    roles: patient.roles,
    birthDate: patient.birthDate,
    bodies: patient.bodies,
    illness: patient.illness,
    patientCompany: patient.patientCompany,
    patientDiaries: patient.patientDiaries,
  };
};

module.exports = mongoose.model("Patient", PatientSchema);
