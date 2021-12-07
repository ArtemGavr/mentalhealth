//require
const router = require("express").Router();
const Illness= require("../../models/illness");
const { permit } = require("../../middlewares/permition_roles");
const mongoose = require("mongoose");
//routes

router.get("/", permit(["patient"]), list);
router.get("/search/", permit(["patient"]), search);
router.get("/:id", permit(["admin"]), read);
router.post("/", permit(["admin", "patient"]), create);
router.put("/:id", permit(["admin"]), update);
router.delete("/:id", permit(["admin"]), del);

//implementations

/**
 * List of Illness with pagination
 */
async function list(req, res) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const illness = await Illness.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Illness.estimatedDocumentCount();
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
 * search for Illness item
 */
async function search(req, res) {
  try {
    const str = req.query.title;
    const criteria = str.length > 0 ? { title: { $regex: `${str}`, $options: "i" } } : undefined;
    const found = await Illness.find(criteria);
    res.json(found);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Read Illness
 */
async function read(req, res) {
  try {
    const foundIllness= await Illness.findById(req.params.id);
    res.json(Illness.format(foundIllness));
  } catch (error) {
    res.status(404).json({
      message: "Patient is not found",
    });
  }
}

/**
 * Create Illness
 */
async function create(req, res) {
  try {
    const { name, severity} = req.body;

    let newIllness = await new Illness({
      name,
      severity,
    });
    await newIllness.save();
    res.json(Illness.format(newIllness));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Update Illness
 */
async function update(req, res) {
  try {
    const { title, severity} = req.body;
    const toUpdate = {
      ...(title && { title }),
      ...(severity && { severity }),
    };

    const updatedIllness = await Illness.findOneAndUpdate({ _id: req.params.id }, toUpdate, {
      new: true,
    });
    res.status(201).json(Illness.format(updatedIllness));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Delete Illness
 */
async function del(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedIllness = await Illness.findById(id).remove();
    res.status(200).json(deletedIllness);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

//export
module.exports = router;
