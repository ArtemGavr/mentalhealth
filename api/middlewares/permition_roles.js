const passport = require("passport");
const permit = roles => {
  return (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, patient, info) => {
      if (err || !patient) {
        return res.status(401).json({
          message: "patient is not authenticated",
        });
      }
      req.patient = patient;
      const isAllowed = roles.some(role => patient.roles.includes(role));
      if (isAllowed) {
        return next();
      }
      return res.status(403).json({ message: "You are not permitted" });
    })(req, res, next);
  };
};

module.exports = { permit };
