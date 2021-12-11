const router = require("express").Router();
const { permit } = require("../../middlewares/permition_roles");
const Patient = require("../../models/patient");
const Company = require("../../models/companies");
const PatientCompany = require("../../models/patient-company");

//routes
router.get("/", permit(["patient"]), read);
router.post("/", permit(["patient"]), create);
router.delete("/:id", permit(["patient"]), del);
router.get("/workers/:id", permit(["admin"]), workers);

/**
 * Get patientCompany
 */
async function read(req, res) {
  try {
    const foundPatient = req.patient;
    const patientCompany = foundPatient.patientCompany;
    res.json(patientCompany);
  } catch (error) {
    res.status(404).json({
      message: "Patient is not found",
    });
  }
}

/**
 * Get patientCompany
 */
async function workers(req, res) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const compID = req.params.id
    const patientCOmpanies = await PatientCompany.find({companyId: compID})


    let patientForCompany = []
    patientCOmpanies.forEach(el => {
      patientForCompany.push(Patient.find({"id": el.patientId.toString()}))
    })
    const total = await Patient.estimatedDocumentCount();
    const pages = Math.round(total / limit);

    res.json({
      total,
      pages,
      currentPage: page,
      perPage: limit,
      patientForCompany,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * create/add patientCompany
 */
async function create(req, res) {
  try {
    const companyId = req.body.companyId;
    let patientId = req.body.patientId;
    const startDate = req.body.startDate
    const foundPatient = req.patient;
    patientId = req.body.patientId = foundPatient._id.toString()

    let newPatientCompany = await new PatientCompany( {
      companyId,
          patientId,
          startDate
    })
    newPatientCompany.save();

    foundPatient.patientCompany.push({companyId, patientId, startDate });
    await foundPatient.save();
    res.json(foundPatient.patientCompany);

  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}


/**
 * Delete patientCompany
 */
async function del(req, res) {
  try {
    patientCompanyId = req.params.id;
    const patient = req.patient;
    let removedoc = patient.patientCompany.find(cmpn=> {
      return cmpn.id == patientCompanyId;
    });
    patient.patientCompany.remove(removedoc);
    if (removedoc == undefined) {
      return res.status(500).json({
        message: "Document doesn't exist",
      });
    }
    await patient.save();
    return res.status(201).json(removedoc);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
}


module.exports = router;
