const express = require("express");
const fileUpload = require("express-fileupload");
const monoose = require("mongoose");

const authRouter = require("./routers/authRouters");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/auth", authRouter);

const start = async () => {
  try {
    await monoose.connect(
      "mongodb+srv://root:root@users.2tuvvt3.mongodb.net/users?retryWrites=true&w=majority"
    );
    app.listen(process.env.PORT, () =>
      console.log(`listen ${process.env.PORT}`)
    );
  } catch (error) {}
};

start();
