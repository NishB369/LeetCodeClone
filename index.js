const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./src/config/db.js");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./src/routes/userAuth.routes.js");

app.use(express.json());
app.use(cookieParser());

main()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Server listening at port number: " + process.env.PORT);
    });
  })
  .catch((err) => console.log("Error Occurred: " + err));

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
