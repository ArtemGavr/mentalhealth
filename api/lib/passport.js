const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Patient = require("../models/patient");
const passport = require("passport");

module.exports = function (passport) {
  passport.use(
    "jwt",
    new StrategyJwt(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,
      },
      function (jwtPayload, done) {
        Patient.findById(jwtPayload.id).then(patient => {
          return done(null, patient);
        });
      }
    )
  );
  passport.serializeUser(function (patient, done) {
    done(null, patient.id);
  });

  passport.deserializeUser(function (id, done) {
    Patient.findById(id, function (err, patient) {
      done(err, patient);
    });
  });
};
