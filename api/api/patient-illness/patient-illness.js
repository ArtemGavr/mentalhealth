const router = require("express").Router();
const { permit } = require("../../middlewares/permition_roles");

//routes
// router.get("/find", permit(["user"]), find);
router.get("/", permit(["user"]), read);
router.post("/", permit(["user"]), create);
router.delete("/:id", permit(["user"]), del);

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
      message: "User is not found",
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


/**
 * Find by date
 */
/*async function find(req, res) {
  try {
    const userId = req.user.id;
    const { selectedFirstDate, selectedSecondDate } = req.query;
    const aggregation = await User.aggregate([
      // Find user by ID
      { $match: { _id: mongoose.Types.ObjectId(userId) } },

      // Take all food user has
      { $unwind: "$userFood" },

      {
        $match: {
          "userFood.date": { $gte: new Date(selectedFirstDate), $lte: new Date(selectedSecondDate) },
        },
      },

      // Group all food User posted by foodId and date
      {
        $group: {
          _id: { foodId: "$userFood.foodId", date: "$userFood.date", id: "$userFood._id" },
          amount: { $sum: "$userFood.amount" },
        },
      },

      // Lookup food details in food table
      {
        $lookup: {
          from: "foods",
          localField: "_id.foodId",
          foreignField: "_id",
          as: "foodDetails",
        },
      },
      // Flatten food data
      { $unwind: "$foodDetails" },
      // Project calculations, form final response object
      {
        $project: {
          title: "$foodDetails.title",
          carbs: { $multiply: ["$amount", 0.01, "$foodDetails.carbs"] },
          calorie: { $multiply: ["$amount", 0.01, "$foodDetails.calorie"] },
          proteins: { $multiply: ["$amount", 0.01, "$foodDetails.proteins"] },
          fats: { $multiply: ["$amount", 0.01, "$foodDetails.fats"] },
          amount: 1,
        },
      },
    ]);

    const totals = aggregation.reduce(
      (a, i) => {
        a.calorie += i.calorie;
        a.fats += i.fats;
        a.proteins += i.proteins;
        a.carbs += i.carbs;
        return a;
      },
      { calorie: 0, fats: 0, carbs: 0, proteins: 0 }
    );

    res.send({ items: aggregation, totals });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}*/

module.exports = router;
