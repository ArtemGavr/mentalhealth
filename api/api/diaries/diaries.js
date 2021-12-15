const router = require("express").Router();
const PatientDiaries = require("../../models/diaries");
const { permit } = require("../../middlewares/permition_roles");
//routes
router.get("/last", permit(["patient"]), getLast);
router.get("/", permit(["patient"]), read);
router.post("/", permit(["patient"]), create);
router.delete("/:id", permit(["patient"]), del);

/**
 * Get diaries
 */
async function read(req, res) {
  try {
    const foundPatient = req.patient;
    const diaries = foundPatient.patientDiaries;
    res.json(diaries);
  } catch (error) {
    res.status(404).json({
      message: "Patient is not found",
    });
  }
}

/**
 * Get last diaries
 */
async function getLast(req, res) {
  const foundPatient = req.patient;
  const patientDiaries = foundPatient.patientDiaries;
  if (patientDiaries.length == 0) {
    return res.status(500).json("this patient has no diaries yet");
  } else {
    let lastDiaries = patientDiaries[patientDiaries.length - 1];
    return res.json(lastDiaries);
  }
}

/**
 * create patient diaries
 */
async function create(req, res) {
  try {
    let newDiaries = {};
    const {
        note} = req.body;
    newDiaries= { note };
    newDiaries.patient = req.patient.id;
    let foundPatient = req.patient;
    foundPatient.patientDiaries.push(newDiaries);
    await foundPatient.save();
    res.json(PatientDiaries.format(newDiaries));
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
}

/**
 * Delete diaries
 */
async function del(req, res) {
  try {
    let diariesId = req.diaries.id;
    const patient = req.patient;
    let removedoc = patient.patientDiaries.find(diaries => {
      return diaries.id == diariesId;
    });
    patient.patientDiaries.remove(removedoc);
    if (removedoc == undefined) {
      return res.status(500).json({
        message: "Document doesn't exist",
      });
    }
    await patient.save();
    return res.status(201).json(removedoc);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}
//export
module.exports = router;
