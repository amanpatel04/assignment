import asyncHandler from "../utils/asyncHandler.js";
import Contest from "../models/contest.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getUserRating } from "../utils/codeforceApi.js";

export const syncContestByHandle = async (handle) => {
  if (handle === "null") {
    return;
  }
  const apiRes = await getUserRating(handle);
  for (let i = 0; i < apiRes.result.length; i++) {
    if (
      (await Contest.exists({
        handle: handle,
        contestId: apiRes.result[i].contestId,
      })) === null
    ) {
      const contestObject = apiRes.result[i];
      contestObject.handle = handle;
      await Contest.create(contestObject);
    }
  }
}

export const getContestByHandle = asyncHandler(async (req, res) => {
  const { handle, day } = req.query;
  if (handle === "null" || day === "null") {
    return res.status(400).json(new ApiResponse(400, null, "Invalid handle"));
  }
  const time = Math.floor(Date.now() / 1000) - Number(day) * 24 * 60 * 60;
  const contest = await Contest.aggregate([
    {
      $match: {
        handle: handle,
        ratingUpdateTimeSeconds: { $gt: time },
      }
    }
  ])

  res
    .status(200)
    .json(new ApiResponse(200, contest, "Contest found successfully"));
});
