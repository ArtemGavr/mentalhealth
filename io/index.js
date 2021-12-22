const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const time = 3000;

setInterval(() => {
  start();
}, time);

async function start() {
  let ids = await getPatientsId();
  ids.forEach(async (el) => {
    try {
      let hr = Math.round(randomNumber(60, 120))
      let temp = Math.round(randomNumber(36, 42))
      await axios.post(process.env.BASE_URL + 'healthParams/' + el, {
        headers: {
          'Content-type': 'application/json',
          'accept': 'application/json'
        }, body: {
          'hr': hr,
          'temp': temp,
        }
      });
      console.log("data sent to " + el + " with hr: " + hr + " temp: " + temp)
    }
    catch (e) {
      console.log(e)
    }

  })
}

async function getPatientsId() {
  let patients = await axios.get(process.env.BASE_URL + 'patient', { headers: {
      'Content-type': 'application/json',
    }});

  let ids = [];
  let data = patients.data.data;

  data.forEach((el) => {
    ids.push(el._id);
  });

  return ids;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}