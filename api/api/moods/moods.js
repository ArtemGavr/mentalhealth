const router = require("express").Router();
const { permit } = require("../../middlewares/permition_roles");
//routes

router.post("/:id", permit(["user"]), create);


/**
 * create patient moods
 */
async function create(req, res) {

  try {
    const patient = req.patient;
    let patientDiariesID = req.params.id;
    let foundDiaries = await patient.patientDiaries.find(patientDiariespp => {
      return patientDiariespp._id == patientDiariesID;
    });
    let diaries = foundDiaries._id;
    let newMoods = {};
    const {
      stress,
      anxiety,
      depression,
      general,
      happiness
    } = req.body;
    newMoods = {
      stress,
      anxiety,
      depression,
      general,
      happiness,
      diaries
    };
    foundDiaries.moods.push(newMoods);
    await patient.save();
    res.json(foundDiaries);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "An error occurred",
    });
  }
}


//export
module.exports = router;
