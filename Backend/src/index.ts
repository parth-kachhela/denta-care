import express from "express";
import cors from "cors";
import appointment from "./Routes/BookAppointment";
import getAllPatients from "./Routes/GetAllpatient";
import updateStatus from "./Routes/UpdateStatus";
import Addpatient from "./Routes/Addpatient";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hey there");
});

app.post("/api/appointment", appointment);
app.post("/api/patients", Addpatient); // 👈 This route handles both patient and visit
app.get("/api/get", getAllPatients);
app.put("/api/appointments/:id/status", updateStatus);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
