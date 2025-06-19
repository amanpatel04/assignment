import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getUserInfo } from "../utils/codeforceApi.js";
import { syncContestByHandle } from "./contest.controllers.js";
import { syncProblemonByHandle } from "./problem.controllers.js";
import Contest from "../models/contest.models.js";
import Problem from "../models/problem.model.js";

import User from "../models/user.models.js";

export const test = asyncHandler(async (req, res) => {
  let user = await getUserInfo("amanpatel04");
  if (user === null) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  await User.create({
    firstName: user.result[0].firstName,
    lastName: user.result[0].lastName,
    email: user.result[0].email,
    handle: user.result[0].handle,
    rating: user.result[0].rating,
    maxRating: user.result[0].maxRating,
  });

  user = await User.findOne({ handle: "amanpatel04" });

  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const addUserByHandle = asyncHandler(async (req, res) => {
  const handle = req.query.handle.toLowerCase();
  if (await User.exists({ handle: handle })) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "User already exists"));
  }
  const apiRes = await getUserInfo(handle);
  if (apiRes.status === "FAILED") {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Codeforce Api Error"));
  }

  const user = await User.create({
    firstName: apiRes.result[0].firstName,
    lastName: apiRes.result[0].lastName,
    email: apiRes.result[0].email,
    handle: apiRes.result[0].handle.toLowerCase(),
    rating: apiRes.result[0].rating,
    maxRating: apiRes.result[0].maxRating,
  });

  if (user === null) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Unable to create user"));
  }

  syncContestByHandle(user.handle);
  syncProblemonByHandle(user.handle);

  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

export const isValidHandle = asyncHandler(async (req, res) => {
  const handle = req.query.handle;
  const user = await User.exists({ handle: handle });
  if (user !== null) {
    return res.status(200).json(new ApiResponse(200, user, "User already exists"));
  }
  const apiRes = await getUserInfo(handle);
  if (apiRes.status === "FAILED") {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  res.status(200).json(apiRes);
});

export const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const formData = req.body;
  if (!user || !formData) {
    res.status(404).json(new ApiResponse(404, null, "Invalid User"));
  }
  let flag = false;
  for (const key in formData) {
    if (user[key] !== formData[key]) {
      flag = true;
      user[key] = formData[key];
    }
  }
  if (flag) await user.save();
  res.status(200).json(new ApiResponse(200, null, "User updated successfully"));
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json(new ApiResponse(404, null, "Invalid User"));
  }

  await Contest.deleteMany({ handle: user.handle });
  await Problem.deleteMany({ handle: user.handle });

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

