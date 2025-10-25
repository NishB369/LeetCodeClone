const Problem = require("../models/problems.js");
const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemsUtility.js");

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolutions,
    problemCreator,
  } = req.body;

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

    res.status(201).send("Problem Created Successfully!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProblem };
