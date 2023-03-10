const express = require("express");
const fileUpload = require("express-fileupload");
const monoose = require("mongoose");

const corsMiddleware = require("./middleware/corsMiddleware");

const usersRouter = require("./routers/usersRouters");
const uploadFileRouter = require("./routers/filesRouters");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(corsMiddleware);

app.use("/auth", usersRouter);
app.use("/file", uploadFileRouter);

const start = async () => {
  try {
    await monoose.connect(process.env.DB_CONNECT);
    app.listen(process.env.PORT, () =>
      console.log(`listen ${process.env.PORT}`)
    );
  } catch (error) {}
};

start();
