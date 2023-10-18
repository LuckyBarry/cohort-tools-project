const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")
const mongoose = require("mongoose");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

app.get("/docs", (request, response) => {
  response.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (request, response) => {
  try {
    const allCohorts = await Cohort.find()
    response.status(200).json(allCohorts)
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})
app.post('/api/cohorts', async (request, response) => {
  try {
    const newCohort = await Cohort.create(request.body)
    response.status(201).json({ cohort: newCohort })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})
app.get('/api/cohorts/:cohortId', async (request, response) => {
  const { cohortId } = request.params
  try {
    const oneCohort = await Cohort.findById(cohortId, request.body);
    response.status(201).json(oneCohort)
  } catch (error) {
    response.status(500).json({ message: "not created" });

  }
});
app.put('/api/cohorts/:cohortId', async (request, response) => {
  const { cohortId } = request.params
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, request.body, { new: true })
    response.status(202).json({ cohort: updatedCohort })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})

app.delete('/api/cohorts/:cohortId', async (request, response) => {
  const { cohortId } = request.params
  await Cohort.findByIdAndDelete(cohortId)
  response.status(202).json({ message: 'Cohort deleted' })
})
app.get('/api/students', async (request, response) => {
  try {
    const students = await Student.find().populate("cohort")
    response.status(201).json(students);
  } catch (error) {
    response.status(500).json({ message: "Student not created" });

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

app.get('/api/students/cohorts/:cohortId', async (request, response) => {
  const { cohortId } = request.params
  try {
    const studentsCohort = await Student.find({ cohort: cohortId }).populate("cohort")
    console.log()
    response.json(studentsCohort)
  }
  catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})
app.get('/api/students/:studentId', async (request, response) => {
  const { studentId } = request.params
  console.log(studentId)
  try {
    const oneStudent = await Student.findById(studentId).populate("cohort")
    console.log(oneStudent);
    response.status(201).json({ student: oneStudent })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Student does not exist" });

  }
});

app.put('/api/students/:studentId', async (request, response) => {
  const { studentId } = request.params
  try {
    const updatedStudent = await Cohort.findByIdAndUpdate(studentId, request.body, { new: true })
    response.status(202).json({ student: updatedStudent })
  } catch (error) {
    response.status(400).json({ error })
  }
})
app.delete('/api/students/:studentId', async (request, response) => {
  const { studentId } = request.params
  await Student.findByIdAndDelete(studentId)
  response.status(202).json({ message: 'Student deleted' })
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});