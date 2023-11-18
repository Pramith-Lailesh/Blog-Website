import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`MONGODB CONNECTED SUCCESSFULLY`);
  })
  .catch((err) => {
    console.log(`MONGODB CONNECTION FAILER`, err);
  });

app.use("/", router);

app.listen(8000, () => {
  console.log(`server is listening at 8000`);
});
