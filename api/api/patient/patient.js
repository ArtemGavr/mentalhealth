//require
const router = require("express").Router();
const patient = require("../../models/patient");
const { createPatientSchema, updatePatientSchema } = require("../../validations/patient");
const bcrypt = require("bcrypt");
const { validation } = require("../../middlewares/validation_joi");
const { generateToken } = require("../../lib/generateToken");
const { permit } = require("../../middlewares/permition_roles");
const passport = require("passport");

//routes
router.get("/", list);
router.get("/me",  permit(["patient"]), me);

router.get("/:id", read);

// router.post("/", validation(createPatientSchema), create);
// router.put("/:id", validation(updatePatientSchema), update);
router.post("/",  create);
router.put("/:id",  update);
router.delete("/:id", del);
router.post("/login", login);
router.post("/logout", logout);

//implementations



/**
 * List of all patients
 */
async function list(req, res) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const data = await patient
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await patient.estimatedDocumentCount();
    res.json({
      total,
      currentPage: page,
      perPage: limit,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Read single patient
 */
async function read(req, res) {
  try {
    const foundPatient = await patient.findById(req.params.id);
    res.json(foundPatient);
  } catch (error) {
    res.status(404).json({
      message: "Patient is not found",
    });
  }
}

/**
 * Create patient
 */
async function create(req, res) {
  try {
    const { name, surname, email, jobTitle, birthDate } = req.body;
    const salt = await bcrypt.genSalt();

    const password = await bcrypt.hash(req.body.password, salt);

    let newPatient = await new patient({
      name,
      surname,
      email,
      password,
      jobTitle,
      birthDate
    });
    await newPatient.save();
    res.json(patient.format(newPatient));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Update patient
 */
 async function update(req, res) {
    try {
      const { name, surname, email, jobTitle, birthDate } = req.body;
      let password = req.body.password;
      if (password) {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
      }
      const toUpdate = {
        ...(email && { email }),
        ...(name && { name }),
        ...(surname && { surname }),
        ...(password && { password }),
        ...(jobTitle && { jobTitle }),
        ...(birthDate && { birthDate }),
      };

      const updatedPatient = await patient.findOneAndUpdate({ _id: req.params.id }, toUpdate, {
        new: true,
      });
      res.status(201).json(patient.format(updatedPatient));
    } catch (error) {
      res.status(500).json({
        message: "An error occured",
      });
    }
  }


/**
 * Delete patient
 */
async function del(req, res) {
    try {
      const deletedPatient = await patient.findById(req.params.id).remove();
      res.status(201).json(deletedPatient);
    } catch (error) {
      res.status(500).json({
        message: "An error occured",
      });
    }
  }

///////////////
/**
 * me endpoint
 */
 async function me(req, res) {
    try {
      res.json(patient.format(req.patient));
    } catch (error) {
      res.status(404).json({
        message: "Patient is not found",
      });
    }
  }

/**
 * Login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const patientWithEmail = await patient.findOne({ email });
    await bcrypt.compare(password, patientWithEmail.password, (err, data) => {
      if (err) throw err;
      if (data) {
        const token = generateToken(patientWithEmail._id);
        console.log(token);
        res.setHeader("access_token", token);
        return res.json({patientWithEmail, token});
      } else {
        return res.status(401).json({ error: "Invalid credential" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Patient not exist" });
  }
}

/**
 * Logout
 */
async function logout(req, res) {
  try {
    res.setHeader("access_token", null);
    return res.status(200).json();
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
}


//export
module.exports = router;
