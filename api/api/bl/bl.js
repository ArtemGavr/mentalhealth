const router = require("express").Router();
const Patient = require("../../models/patient");
const {permit} = require("../../middlewares/permition_roles");
const illness = require("../../models/illness");

router.get("/", permit(["patient"]), bl);

/**
 * Get bodies
 */
async function bl(req, res) {
  try {
    const foundPatient = req.patient;

    let message = " ";
    let weightIsOk;
    {
      const params = foundPatient.bodies;
      const lastParams = params[params.length - 1];
      const {weight, height} = lastParams;

      const calculatedWeight = (height - 100) - ((height - 150) / 2);

      weightIsOk = 0;
      if (calculatedWeight <= weight + 5 && calculatedWeight >= weight - 5) {
        weightIsOk = 1;
        message += "Your weight is fine. "
      } else {
        weightIsOk = 0;
        message += "Your weight needs proper attention. "
      }
    }

    let severity_p = 0;
    {
      const anxiety = await illness.find({name: "Anxiety"});

      const lastAnxiety = anxiety[anxiety.length - 1];
      const {_id, severity} = lastAnxiety;

      severity_p = 2 ;
    }


    let hr_p, temp_p;
    {
      const patientHealthParams = foundPatient.healthParams;
      if (patientHealthParams.length == 0) {
        return res.status(500).json("this patient has no params yet");
      }

      const lastHealthParams = patientHealthParams[patientHealthParams.length - 1];
       const {hr, temp} = lastHealthParams;
       hr_p= hr;
       temp_p = temp;
      let heartRateIndex = 1;
      if (hr > 85 || hr < 65) {
        heartRateIndex = 0;
      }

      let tempIndex = 1;
      if (temp > 37.5) {
        tempIndex = 0;
      }
      const indexSum = heartRateIndex + tempIndex;
      if (indexSum == 2) {
        message += "Heart and temperature is good. "
      } else if (indexSum == 1) {
        if (heartRateIndex === 0) {
          message += "Please keep checkin your heart rate. "
        } else if (tempIndex === 0) {
          message += "Please keep checkin your temperature rate. "
        }
      } else {
        message += "Please get additional tests. "
      }
    }


    let stress_p,
        anxiety_p,
        depression_p,
        general_p,
        happiness_p,
        mentalInstruction

    {
      const patientDiaries = foundPatient.patientDiaries;
      if (patientDiaries.length == 0) {
        return res.status(500).json("this patient has no diaries yet");
      }
      const lasrDiaries = patientDiaries[patientDiaries.length - 1];

      const moodsArr = lasrDiaries.moods;
      const lastMood = moodsArr[moodsArr.length - 1]
      const {
        stress,
        anxiety,
        depression,
        general,
        happiness
      } = lastMood;

      stress_p = stress
      anxiety_p = anxiety
      depression_p = depression
      general_p = general
      happiness_p = happiness

      let stressRateInd = 1;
      let anxietyRateInd = 1;
      let deppRateInd = 1;
      let generalRateInd = 1;
      let happinessRateInd = 1;
      if (stress > 5) {
        stressRateInd = 0;
      }
      if (anxiety > 4) {
        anxietyRateInd = 0;
      }
      if (depression > 5) {
        deppRateInd = 0;
      }
      if (general > 4) {
        generalRateInd = 0;
      }
      if (happiness < 2) {
        happinessRateInd = 0;
      }

      const mentalSum = stressRateInd + anxietyRateInd + deppRateInd + generalRateInd + happinessRateInd;
      mentalInstruction = false;
      if (mentalSum < 3) {
        mentalInstruction = true;
        message += "Please seek mental help. "
      } else {
        message += "Your mental health is fine. "
      }
    }


    return res.json({
      hr_p,
      temp_p,
      weightIsOk,
      stress_p,
      anxiety_p,
      depression_p,
      general_p,
      happiness_p,
      mentalInstruction,
      severity_p,
      message: message
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      error,
      message: "Patient is not found",
    });
  }
}

//export
module.exports = router;

