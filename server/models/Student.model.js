const mongoose = require("mongoose");
const Schema = mongoose.Schema("student",studentSchema);
const studentSchema = new Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort: Number,
    projects: Array
});

app.get('/api/students',async(req,res)=>{
   try{
     const students =await Student.find();
         response.status(201).json(students);
     }catch (error) {
         res.status(500).json({message: "not created"});
         
     }
 });

 app.post('/api/students', async (request, response) => {
    try {
      const newStudent = await Student.create(request.body)
      response.status(201).json({ student: newStudent })
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    }
  })
  app.get('/api/students',async(req,res)=>{
    console.log(request.query)
    const {}
    try {
        const allData = await Student.find({})
        response.json({allData})
    } catch (error) {
        response.
    }

  })
 
const Student = mongoose.model("Student", studentSchema)
module.exports = Student;