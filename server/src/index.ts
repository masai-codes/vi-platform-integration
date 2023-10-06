import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
dotenv.config(); // Load variables from .env into process.env

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5000",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Hello World!");
});

const axiosConfig = {
  headers: {
    "x-auth-token": process.env.VI_API_KEY,
  },
};

app.post("/assessments/create", async (req, res) => {
  try {
    let testData = req.body;
    testData.questions = ["64eba3e0b35d051ab7ad358d"];
    testData.voice_code = "en-US-GuyNeural";
    testData.lock_assessment_after_end_time = false;
    testData.model = "gpt-3.5-turbo";
    testData.webhooks = ["64eba5eab35d051ab7ad35b1"];
    testData.tags = [{ tag_name: "react" }];
    const { data } = await axios.post(
      `${process.env.VI_API_URL}/virtual-interview-template/assessments/create`,
      testData,
      axiosConfig
    );

    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

app.get("/assessments", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.VI_API_URL}/virtual-interview-template/assessments`, axiosConfig);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/assessments/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.VI_API_URL}/virtual-interview-template/assessments/${req.params.id}`,
      axiosConfig
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Add user to assessment
app.post("/assessments/submissions/create", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.VI_API_URL}/vi-assessment/submission/create`,
      req.body,
      axiosConfig
    );

    res.status(201).json(data);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err });
  }
});

app.get("/assessments/submissions/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.VI_API_URL}/vi-assessment/submissions/?assessment_id=${req.params.id}`,
      axiosConfig
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Recieve callback
app.post(`/webhook/callback`, (req, res) => {
  try {
    console.log(req.body, "Recieved data in webhook");
    res.status(200).json("ok");
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
