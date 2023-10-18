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
app.post('/api/cohorts', async (request, response) => {
    try {
      const newCohort = await Cohort.create(request.body)
      response.status(201).json({ cohort: newCohort })
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    }
  })
  app.get('/api/cohorts',async(req,res)=>{
    try{
      const allCohorts =await Cohort.find();
          response.status(201).json(allCohorts);
      }catch (error) {
          res.status(500).json({message: "not created"});
          
      }
  });
  app.get('/api/cohorts/:cohortId',async(req,res)=>{
    const {_id} = request.params
    console.log(_id)

    try{
      const oneCohort =await Cohort.findById(_id,request.body);
          response.status(201).json({cohort: oneCohort})
      }catch (error) {
          res.status(500).json({message: "not created"});
          
      }
  });




const Cohort = mongoose.model("Cohort", cohortSchema)
module.exports = Cohort;