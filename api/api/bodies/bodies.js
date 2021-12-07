const router = require("express").Router();
const PatientBodies = require("../../models/bodies");
const { createBodySchema } = require("../../validations/body");

const { validation } = require("../../middlewares/validation_joi");
const { permit } = require("../../middlewares/permition_roles");
//routes
router.get("/last", permit(["patient"]), getLast);
router.get("/", permit(["patient"]), read);
router.post("/", permit(["patient"]), create);
router.delete("/:id", permit(["patient"]), del);

/**
 * Get bodies
 */
async function read(req, res) {
  try {
    const foundPatient = req.patient;
    const bodies = foundPatient.bodies;
    res.json(bodies);
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
  const bodies = foundPatient.bodies;
  if (bodies.length == 0) {
    return res.status(500).json("this Patient has no parameters yet");
  } else {
    lastBodies = bodies[bodies.length - 1];
    return res.json(lastBodies);
  }
}

/**
 * create patient bodies
 */
async function create(req, res) {
  try {
    let newBodies = {};
    const { weight, height, sex } = req.body;
    newBodies = { weight, height, sex };
    newBodies.patient = req.patient.id;
    validation(createBodySchema);
    let foundPatient = req.patient;
    foundPatient.bodies.push(newBodies);
    await foundPatient.save();
    res.json(PatientBodies.format(newBodies));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Delete body bodies
 */
async function del(req, res) {
  try {
    bodiesId = req.bodies.id;
    const patient = req.patient;
    let removedoc = patient.bodies.find(body => {
      return body.id == bodiesId;
    });
    patient.bodies.remove(removedoc);
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
