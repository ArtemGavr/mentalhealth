const router = require("express").Router();
const { permit } = require("../../middlewares/permition_roles");
//routes

router.post("/:id", permit(["user"]), create);


/**
 * create user bodies
 */
async function create(req, res) {

  try {
    const user = req.user;
    let patientDiariesID = req.patientDiaries.id;
    let foundDiaries = await user.patientDiaries.find(patientDiaries => {
      return patientDiariesID._id == patientDiariesID;
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
    await user.save();
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
