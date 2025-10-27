const express = require("express");
const { adminMiddleware } = require("../middlewares/admin.middleware.js");
const { userMiddleware } = require("../middlewares/user.middlewares.js");
const {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblems
} = require("../controllers/problemsCrud.controllers.js");

const problemRouter = express.Router();

// Admin Protected Routes
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.patch("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

// Open Routes
problemRouter.get("/problemById/:id", userMiddleware, getProblemById);
problemRouter.get("/getAllProblems", userMiddleware, getAllProblems);
// problemRouter.get(
//   "/problemsSolvedByUser",
//   userMiddleware,
//   getAllSolvedProblemsByUser
// );

module.exports = { problemRouter };
