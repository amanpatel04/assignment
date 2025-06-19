import cron from "node-cron";
import { syncContestByHandle } from "../controllers/contest.controllers.js";
import { syncProblemonByHandle } from "../controllers/problem.controllers.js";
import User from "../models/user.models.js";
import Problem from "../models/problem.model.js";

// nodemailer 

const sendMail = (user) => {
  console.log(`sent mail to user ${user}`);
};

cron.schedule("0 2 * * *", async () => {
  const users = await User.find().select("handle");

  for (let i = 0; i < users.length; i++) {
    const handle = users[i].handle;
    const time = Math.floor(Date.now() / 1000) - 6 * 24 * 60 * 60;
    const problems = await Problem.aggregate([
      {
        $match: {
          handle: handle,
          submitTime: { $gt: time },
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    if (problems.length === 0) {
      sendMail(handle);
    }
    await syncContestByHandle(handle);
    await syncProblemonByHandle(handle);
  }
});
