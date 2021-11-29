const router = require("express").Router();
const UserParams = require("../../models/bodies");
const { createBodySchema } = require("../../validations/body");

const { validation } = require("../../middlewares/validation_joi");
const { permit } = require("../../middlewares/permition_roles");
//routes
router.get("/last", permit(["user"]), getLast);
router.get("/", permit(["user"]), read);
router.post("/", permit(["user"]), create);
router.delete("/:id", permit(["user"]), del);

/**
 * Get bodies
 */
async function read(req, res) {
  try {
    const foundUser = req.user;
    const params = foundUser.params;
    res.json(params);
  } catch (error) {
    res.status(404).json({
      message: "User is not found",
    });
  }
}

/**
 * Get last param
 */
async function getLast(req, res) {
  const foundUser = req.user;
  const params = foundUser.params;
  if (params.length == 0) {
    return res.status(500).json("this user has no parameters yet");
  } else {
    lastParams = params[params.length - 1];
    return res.json(lastParams);
  }
}

/**
 * create user bodies
 */
async function create(req, res) {
  try {
    let newParams = {};
    const { weight, height, activity } = req.body;
    newParams = { weight, height, activity };
    newParams.user = req.user.id;
    validation(createBodySchema);
    let foundUser = req.user;
    foundUser.params.push(newParams);
    await foundUser.save();
    res.json(UserParams.format(newParams));
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
    paramId = req.params.id;
    const user = req.user;
    let removedoc = user.params.find(param => {
      return param.id == paramId;
    });
    user.params.remove(removedoc);
    if (removedoc == undefined) {
      return res.status(500).json({
        message: "Document doesn't exist",
      });
    }
    await user.save();
    return res.status(201).json(removedoc);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}
//export
module.exports = router;
