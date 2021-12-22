const router = require("express").Router();
const PatientParams = require("../../models/healthParams");

const { permit } = require("../../middlewares/permition_roles");
const patient = require("../../models/patient");
//routes
router.get("/last", permit(["patient"]), getLast);
router.get("/", permit(["patient"]), read);
router.post("/:id",  create);
router.delete("/:id", permit(["patient"]), del);

/**
 * Get params
 */
async function read(req, res) {
  try {
    const foundPatient = req.patient;
    const params = foundPatient.healthParams;
    res.json(params);
  } catch (error) {
    res.status(404).json({
      message: "Patient is not found",
    });
  }
}

/**
 * Get last param
 */
async function getLast(req, res) {
  const foundPatient = req.patient ;
  const params = foundPatient.healthParams;
  if (params.length == 0) {
    return res.status(500).json("this Patient has no parameters yet");
  } else {
    lastParams = params[params.length - 1];
    return res.json(lastParams);
  }
}

/**
 * create patient params
 */
async function create(req, res) {
  try {
    let patientID = req.params.id;
    let newParams = {};
    const { hr, temp } = req.body;
    newParams = { hr, temp };
    newParams.patient = patientID;

    let foundPatient = await patient.findById(patientID);
    foundPatient.healthParams.push(newParams);
    await foundPatient.save();
    res.json(PatientParams.format(newParams));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Delete parmas
 */
async function del(req, res) {
  try {
    paramsId = req.healthParams.id;
    const patient = req.patient;
    let removedoc = patient.healthParams.find(params => {
      return params.id == paramsId;
    });
    patient.healthParams.remove(removedoc);
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
