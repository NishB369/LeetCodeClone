const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./src/config/db.js");
const { redisClient } = require("./src/config/redis.js");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./src/routes/userAuth.routes.js");
const { problemRouter } = require("./src/routes/problemCRUD.routes.js");

app.use(express.json());
app.use(cookieParser());

const initialiseConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server listening at port number: " + process.env.PORT);
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

// main()
//   .then(async () => {
//     app.listen(process.env.PORT, () => {
//       console.log("Server listening at port number: " + process.env.PORT);
//     });
//   })
//   .catch((err) => console.log("Error Occurred: " + err));

initialiseConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
