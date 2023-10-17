const mongoose = require("mongoose");
const Schema = mongoose.Schema

const cohortSchema = new Schema({
    _id: Number,
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: String,
    endDate: String,
    programManager: String,
    leadTeacher: String,
    totalHours: Number
});
const Cohort = mongoose.model("Cohort", cohortSchema)
module.exports = Cohort;