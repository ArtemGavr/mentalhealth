//require
const router = require("express").Router();
const Company= require("../../models/companies");
const PatientCompany= require("../../models/patient-company");
const Patient = require("../../models/patient");
const { permit } = require("../../middlewares/permition_roles");
const mongoose = require("mongoose");
//routes

router.get("/", permit(["patient"]), list);
router.get("/search/", permit(["patient"]), search);
router.get("/:id", permit(["admin"]), read);
router.get("/workers/:id", permit(["admin"]), workers);
router.post("/", permit(["admin"]), create);
router.put("/:id", permit(["admin"]), update);
router.delete("/:id", permit(["admin"]), del);

//implementations

/**
 * List of Company with pagination
 */
async function list(req, res) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const illness = await Company.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Company.estimatedDocumentCount();
    const pages = Math.round(total / limit);
    res.json({
      total,
      pages,
      currentPage: page,
      perPage: limit,
      illness,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * List of Company with pagination
 */
async function workers(req, res) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const compID = req.params.id
    const ff = await Patient.find({"patientCompany":{companyId: compID}})

    const illness = await Company.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
    const total = await Company.estimatedDocumentCount();
    const pages = Math.round(total / limit);
    res.json({
      total,
      pages,
      currentPage: page,
      perPage: limit,
      illness,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * search for Company item
 */
async function search(req, res) {
  try {
    const str = req.query.name;
    const criteria = str.length > 0 ? { name: { $regex: `${str}`, $options: "i" } } : undefined;
    const found = await Company.find(criteria);
    res.json(found);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Read Company
 */
async function read(req, res) {
  try {
    const foundCompany= await Company.findById(req.params.id);
    res.json(Company.format(foundCompany));
  } catch (error) {
    res.status(404).json({
      message: "Company is not found",
    });
  }
}

/**
 * Create Company
 */
async function create(req, res) {
  try {
    const { name} = req.body;

    let newCompany = await new Company({
      name,
    });
    await newCompany.save();
    res.json(Company.format(newCompany));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Update Company
 */
async function update(req, res) {
  try {
    const { name} = req.body;
    const toUpdate = {
      ...(name && { name }),
    };

    const updatedCompany = await Company.findOneAndUpdate({ _id: req.params.id }, toUpdate, {
      new: true,
    });
    res.status(201).json(Company.format(updatedCompany));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Delete Company
 */
async function del(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedCompany = await Company.findById(id).remove();
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

//export
module.exports = router;
