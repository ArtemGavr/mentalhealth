const router = require("express").Router();
const { permit } = require("../../middlewares/permition_roles");

//routes
// router.get("/find", permit(["patient"]), find);
router.get("/", permit(["patient"]), read);
router.post("/", permit(["patient"]), create);
router.delete("/:id", permit(["patient"]), del);

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
 * create/add patientCompany
 */
async function create(req, res) {
  try {
    const companyId = req.body.companyId;
    const name = req.body.name;
    const foundPatient = req.patient;

    foundPatient.patientCompany.push({companyId, name});
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
