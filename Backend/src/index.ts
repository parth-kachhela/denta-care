import express from "express";
import cors from "cors";
import appointment from "./Routes/BookAppointment";
import updateStatus from "./Routes/UpdateStatus";
import Addpatient from "./Routes/Addpatient";
import GetAllAppointment from "./Routes/GetAllAppointment";
import GetAllPatients from "./Routes/GetAllPatients";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hey there");
});

app.post("/api/appointment", appointment);
app.post("/api/patients", Addpatient);
app.get("/api/get", GetAllAppointment);
app.put("/api/appointments/:id/status", updateStatus);
app.get("/api/patients", GetAllPatients);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
