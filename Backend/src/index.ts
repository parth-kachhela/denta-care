import express from "express";
import cors from "cors";
import appointment from "./Routes/BookAppointment";
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hye there");
});

app.post("/api/appointment", appointment);

app.listen(8080, () => {
  console.log("app is listing");
});
