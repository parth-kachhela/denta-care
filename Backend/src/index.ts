import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hye there");
});

app.listen(8080, () => {
  console.log("app is listing");
});
