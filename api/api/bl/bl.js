const router = require("express").Router();
const Patient = require("../../models/patient");
const { permit } = require("../../middlewares/permition_roles");
const illness = require("../../models/illness");

router.get("/", permit(["user"]), bl);
/**
 * Get bodies
 */
 async function bl(req, res) {
    try {
      const foundUser = req.user;
      const params = foundUser.params;
      const lastParams = params[params.length-1];
      const { weight, height, activity} = lastParams;

      const calculatedWeight = (height -100) - ((height-150)/2);

      let weightIsOk = 0;
      if(calculatedWeight<= weight+5 && calculatedWeight >= weight-5){
        weightIsOk = 1;
      }
      let health = 0;
      if(weightIsOk === 1 && (activity === 2 || activity === 3)){
        health = 1;
      }
      const covid =  await illness.find({title:"COVID-19"});

      const lastCovid = covid[covid.length-1];
      const {_id} = lastCovid;

      const userCovid = foundUser.illness.find(ill => {

    ill._id === _id
    return ill}
    )

      if (health ===1){
        const stage = userCovid.stage;

        const userAnalyzes = foundUser.userAnalyzes;
        if (userAnalyzes.length == 0) {
          return res.status(500).json("this user has no diaries yet");
        }
        const lastAnalyzes = userAnalyzes[userAnalyzes.length - 1];
        const { heartRate, saturation, temp } = lastAnalyzes;
        let heartRateIndex = 1;
        if(heartRate > 85 || heartRate < 65){
            heartRateIndex = 0;
        }
        let saturationIndex =1;
        if(saturation< 95){
            saturationIndex = 0;
        }
        let tempIndex =1;
        if(temp > 37.5){
            tempIndex = 0;
        }
    const indexSum = heartRateIndex + saturationIndex + tempIndex;
    if(indexSum == 3){
        return res.json({
            heartRate,
            saturation,
            temp,
            message:"Everything looks good"
        })
    }else if(indexSum == 2){
        if(heartRateIndex === 0){
            return res.json({
                heartRate,
                saturation,
                temp,
                message:"Please keep checkin your heart rate"
            })
        }else if(saturationIndex===0){
            return res.json({
                heartRate,
                saturation,
                temp,
                message:"Please keep checkin your saturation rate"
            })
        }else if(tempIndex === 0){
                return res.json({
                    heartRate,
                    saturation,
                    temp,
                    message:"Please keep checkin your temperature rate"
                })
        }

    }else{
        return res.json({
            heartRate,
            saturation,
            temp,
            message:"Please get additional tests (blood, moods)"
        })
    }
      }else{
        const stage = userCovid.stage;

         const userAnalyzes = foundUser.userAnalyzes;
         if (userAnalyzes.length == 0) {
           return res.status(500).json("this user has no diaries yet");
         }
         const lastAnalyzes = userAnalyzes[userAnalyzes.length - 1];

         const { heartRate, saturation, temp } = lastAnalyzes;
         const bloodArr = lastAnalyzes.blood;
         const lastBlood = bloodArr[bloodArr.length-1]
         const {eryth,
            hemo,
            leuko,
            trombo,
            bezof,
            ezino,
            limfo,
            mono } = lastBlood;

    const  erythInd = (eryth< 3.8) ? 0:
            (eryth>5) ? 0:
            1;
    const hemoInd = (hemo < 120) ? 0:
            (hemo>160) ? 0:
            1;
     const  leukoInd = (leuko<4) ? 0:
            (leuko > 9)? 0:
            1;
    const tromboInd=(trombo < 170) ? 0:
            (trombo > 320) ? 0:
            1;
    const bezofInd = (bezof<0) ? 0:
            (bezof>1) ? 0:
            1;
    const linfoInd = (limfo<18)? 0:
            (limfo>40)? 0:
            1;
    const monoInd = (mono<3) ? 0:
            (mono>11) ? 0:
            1;
    const ezinoId = (ezino<0.5)? 0:
            (ezino>5)? 0:
            1;

    const bloodSum = erythInd + leukoInd + tromboInd + bezofInd + linfoInd + monoInd + hemoInd + ezinoId;
    const bloodCofecent = bloodSum * 0.3
    const passed = (bloodCofecent < 0.9 ) ? false:
    true;
    const mentalArr = lastAnalyzes.mentalTest;
    const lastMentalTest = mentalArr[mentalArr.length-1];
    const  { stressRate,
        anexityRate,
        indeffRate,
        lonelRate } = lastMentalTest;
       let stressRateInd = 1;
       let anexityRateInd = 1;
       let indeffRateInd =1;
      let lonelRateInd =1;

    if(stressRate> 5){
        stressRateInd = 0;
    }
    if(anexityRate > 4){
        anexityRateInd = 0;
    }
    if(indeffRate>5){
        indeffRateInd = 0;
    }
    if(lonelRate > 4){
        lonelRateInd = 0;
    }
    const mentalSum = stressRateInd + anexityRateInd + indeffRateInd + lonelRateInd;
    let mentalInstruction = false;
    if (mentalSum < 3){
         mentalInstruction = true;
    }


    return res.json({
        heartRate,
        saturation,
        temp,
        passed,
        eryth,
            hemo,
            leuko,
            trombo,
            bezof,
            ezino,
            limfo,
            mono,
        bloodCofecent,
        stressRate,
        anexityRate,
        indeffRate,
        lonelRate,
        mentalInstruction,
        stage

    })

 }

    } catch (error) {
        console.log(error)
      res.status(404).json({
          error,
        message: "User is not found",
      });
    }
  }

  //export
module.exports = router;

