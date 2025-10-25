const express = require("express");

const problemRouter = express.Router();

// Admin Protected Routes
problemRouter.post("/create", createProblem);
problemRouter.patch("/:id", updateProblem);
problemRouter.delete("/:id", deleteProblem);

// Open Routes
problemRouter.get("/:id", getProblemById);
problemRouter.get("/", getAllProblems);
problemRouter.get("/user", getAllSolvedProblemsByUser);

module.exports = { problemRouter };
