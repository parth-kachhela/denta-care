import express from "express";
import cors from "cors";
import appointment from "./Routes/BookAppointment";
import getAllPatients from "./Routes/GetAllpatient";
import updateStatus from "./Routes/UpdateStatus";
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hye there");
});

app.post("/api/appointment", appointment);
app.get("/api/get", getAllPatients);
app.put("/api/appointments/:id/status", updateStatus);
app.listen(8080, () => {
  console.log("app is listing");
});
