import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import Problem from "../models/problem.model.js";
import { getSubmissionByHandle } from "../utils/codeforceApi.js"


export const syncProblemonByHandle = async (handle) => {
  if (handle === 'null') {
    return;
  }
  const apiRes = await getSubmissionByHandle(handle);
  if (apiRes.status === "FAILED") {
    return;
  }
  for (let i=0; i<apiRes.result.length; i++) {
    if (apiRes.result[i].verdict !== "OK") continue;
    const problem = apiRes.result[i].problem;
    const contestId  = await problem.contestId.toString().concat(problem.index.toString());
    if ((await Problem.exists({ handle: handle, contestId: contestId })) === null) {
      await Problem.create({
        contestId: contestId,
        name: problem.name,
        rating: problem.rating,
        tags: problem.tags,
        type: problem.type,
        submitTime: apiRes.result[i].creationTimeSeconds,
        handle: handle
      });
    }
  }
  
};

export const getProblemsByHandle = asyncHandler(async (req, res) => {
  const { handle, day } = req.query;
  if (handle === 'null' || day === 'null') {
    return res.status(400).json(new ApiResponse(400, null, "Invalid handle"));
  }
  const time = Math.floor(Date.now() / 1000) - Number(day) * 24 * 60 * 60;
  const problems = await Problem.aggregate([
    {
      $match: {
        handle: handle,
        submitTime: { $gt: time }
      }
    }
  ])
  res
    .status(200)
    .json(new ApiResponse(200, problems, "Problems fetched successfully"));
});