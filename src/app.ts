import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRouter from "./routers/index.router";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: ["https://codebugger.netlify.app"] }));
app.use((req, res, next) => {
  // res.setHeader("bypass-tunnel-reminder", "Express");
  res.header("Access-Control-Allow-Origin", "*"); // Change * to specific origin if needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Content-Type", "application/json");
  next(); // Pass control to the next handler
});

app.use("/", indexRouter);

export { app };
