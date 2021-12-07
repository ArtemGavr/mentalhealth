const router = require("express").Router();
const { permit } = require("../../middlewares/permition_roles");

//routes
router.get("/", permit(["patient"]), read);
router.post("/", permit(["patient"]), create);
router.delete("/:id", permit(["patient"]), del);

/**
 * Get patientIllness
 */
async function read(req, res) {
  try {
    const foundPatient = req.patient;
    const patientIllness = foundPatient.illness;
    res.json(patientIllness);
  } catch (error) {
    res.status(404).json({
      message: "Patient is not found",
    });
  }
}

/**
 * create/add patientIllness
 */
async function create(req, res) {
  try {
    const illnessId = req.body.illnessId;
    const severity = req.body.stage;
    const foundPatient = req.patient;
    foundPatient.illness.push({illnessId, severity});
    await foundPatient.save();
    res.json(foundPatient.illness);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}


/**
 * Delete patientIllness-food
 */
async function del(req, res) {
  try {
    patientIllnessId = req.params.id;
    const patient = req.patient;
    let removedoc = patient.illness.find(ill=> {
      return ill.id == patientIllnessId;
    });
    patient.illness.remove(removedoc);
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
