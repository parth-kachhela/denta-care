import express from "express";
import cors from "cors";
import GetAllAppointment from "./Routes/GetAllAppointment";
import Addpatient from "./Routes/Addpatient";
import updateStatus from "./Routes/UpdateStatus";
import GetAllPatients from "./Routes/GetAllPatients";
import GetPatientWithVisits from "./Routes/GetPatientWithVisits";
import AddVisit from "./Routes/AddVisit";
import appointment from "./Routes/BookAppointment";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hey there");
});

app.post("/api/appointment", appointment);

app.put("/api/appointments/:id/status", updateStatus);
app.get("/api/get", GetAllAppointment);
app.post("/api/patients", Addpatient);
app.get("/api/patients", GetAllPatients);
app.get("/api/patients/:id", GetPatientWithVisits);
app.post("/api/visits", AddVisit);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
