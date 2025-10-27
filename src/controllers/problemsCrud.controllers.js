const Problem = require("../models/problems.js");
const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemsUtility.js");

const createProblem = async (req, res) => {
  const { visibleTestCases, referenceSolutions } = req.body;

  try {
    for (const elem of referenceSolutions) {
      const { language, completeCode } = elem;
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);

      const resultToken = submitResult.map((value) => value.token);

      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status_id !== 3) {
          return res.status(400).send("Error Occurred");
        }
      }
    }

    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id,
    });

    res.status(201).send("Problem Created Successfully!", userProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;
  const { visibleTestCases, referenceSolutions } = req.body;

  try {
    if (!id) {
      return res.status(401).send("ID Field Not Passed");
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send("Problem Not Found");
    }

    for (const elem of referenceSolutions) {
      const { language, completeCode } = elem;
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);

      const resultToken = submitResult.map((value) => value.token);

      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status_id !== 3) {
          return res.status(400).send("Error Occurred");
        }
      }
    }

    const newProblem = await Problem.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { runValidators: true, new: true }
    );

    console.log(newProblem);
    res.status(200).send("Problem Updated Successfully", newProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).send("ID Field Not Passed");
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send("Problem Not Found");
    }

    const deletedProblem = await Problem.findOneAndDelete(id);
    res.status(200).send("Problem Deleted Successfully", deletedProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).send("ID Field Not Passed");
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send("Problem Not Found");
    }

    res.status(200).send(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    if (problems.length === 0) {
      return res.status(404).send("Problems Not Found");
    }

    res.status(200).send(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblems,
};
