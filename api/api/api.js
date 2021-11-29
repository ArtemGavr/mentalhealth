const patientRouter = require("./patient/patient");
const diariesRouter = require('./diaries/diaries');
const bodiesRouter = require('./bodies/bodies')
const moodsRouter = require('./moods/moods');
const patientIllnessRouter = require('./patient-illness/patient-illness');
const patientCompanyRouter = require('./patient-company/patient-company');
const illnessRouter = require('./illness/illness');
const companiesRouter = require('./company/company');


const BlRouter = require("./bl/bl")

module.exports = {
 patientRouter,
 bodiesRouter,
 diariesRouter,
 illnessRouter,
 patientIllnessRouter,
 moodsRouter,
 BlRouter,
 patientCompanyRouter,
 companiesRouter
};

