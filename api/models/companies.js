const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
    },
    {timestamps: true}
);

CompanySchema.statics.format = company => {
  return {
    name: company.name,
  };
};

module.exports = mongoose.model("Company", CompanySchema);
