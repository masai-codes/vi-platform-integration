import express from "express";
import * as dotenv from "dotenv";
dotenv.config(); // Load variables from .env into process.env

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(process.env.PORT || 6000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
