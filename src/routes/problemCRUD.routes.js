const express = require("express");
const { adminMiddleware } = require("../middlewares/admin.middleware.js");
const { createProblem } = require("../controllers/problemsCrud.controllers.js");

const problemRouter = express.Router();

// Admin Protected Routes
problemRouter.post("/create", adminMiddleware, createProblem);
// problemRouter.patch("/:id", updateProblem);
// problemRouter.delete("/:id", deleteProblem);

// // Open Routes
// problemRouter.get("/:id", getProblemById);
// problemRouter.get("/", getAllProblems);
// problemRouter.get("/user", getAllSolvedProblemsByUser);

module.exports = { problemRouter };
