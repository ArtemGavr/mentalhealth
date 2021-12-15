//require
const express = require("express");
const API = require("./api/api");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
var cors = require('cors')

//initialize
const app = express();
dotenv.config();
connectDB();
//swagger


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API",
			version: "1.0.0",
			description: " ExpressJS Library API",
		},
		servers: [
			{
				url: "http://localhost:2703",
			},
		],
        tags: [
            {
              name: 'Patients'
            }
          ],
        security: [
            {
              ApiKeyAuth: []
            }
          ],
          components: {
            /* ... */
            securitySchemes: {
              ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
              }
            }
          }
	},
	apis: ["./docs/*.js"],

};
{

  const specs = swaggerJsDoc(options);

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}
//logging
//if (process.env.NODE_ENV === "development") {
 // app.use(morgan("dev"));
// }

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport middleware

require("./lib/passport")(passport);


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',  "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//routing
app.use("/api/patient", API.patientRouter);
app.use("/api/bodies", API.bodiesRouter);
app.use("/api/diaries", API.diariesRouter);
app.use('/api/moods', API.moodsRouter);
app.use("/api/patient-illness", API.patientIllnessRouter);
app.use("/api/illness", API.illnessRouter);
app.use("/api/patient-company", API.patientCompanyRouter);
app.use("/api/company", API.companiesRouter);
app.use("/api/healthParams", API.healthParamsRouter);

app.use('/api/results', API.BlRouter);




app.use(cookieParser());
app.get("/about", (req, res) => res.send("read about me"));

//run
app.listen(PORT, () => console.log(`app has been started on port ${process.env.PORT}`));
