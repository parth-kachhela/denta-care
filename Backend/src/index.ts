import express from "express";
import appointment from "./Routes/BookAppointment";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hye there");
});

app.post("/appointment", appointment);

app.listen(8080, () => {
  console.log("app is listing");
});
