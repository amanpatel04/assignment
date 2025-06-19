import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Problem = () => {
  const [problems, setProblems] = useState([]);
  const [problemDay, setProblemDay] = useState(7);
  const [problemStatus, setProblemStatus] = useState({});

  const [searchParams] = useSearchParams();
  const handle = searchParams.get("handle");

  useEffect(() => {
    const problemParams = new URLSearchParams({
      handle: handle,
      day: problemDay,
    });
    fetch(`/api/problem/list/?${problemParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setProblems(data.data);
      });
  }, [handle, problemDay]);

  useEffect(() => {
    let mostDifficult = 0;
    let solveCount = problems.length;
    let avgRating = 0;
    let avgSolveDay = solveCount / 2;
    let minTime = Number.MAX_VALUE;
    let maxTime = Number.MIN_VALUE;
    const ratingBucket = {};
    for (let i = 0; i < solveCount; i++) {
      if (problems[i].rating > mostDifficult) {
        mostDifficult = problems[i].rating;
      }
      if (problems[i].rating in ratingBucket) {
        ratingBucket[problems[i].rating] += 1;
      } else {
        ratingBucket[problems[i].rating] = 1;
      }
      avgRating += problems[i].rating;
      minTime = Math.min(minTime, problems[i].submitTime);
      maxTime = Math.max(maxTime, problems[i].submitTime);
    }
    avgRating = parseInt(avgRating / solveCount);
    avgSolveDay = solveCount / ((maxTime - minTime) / 86400);
    const bucket = [];
    for (let key in ratingBucket) {
      bucket.push({
        rating: key,
        count: ratingBucket[key],
      });
    }
    setProblemStatus({
      mostDifficult: mostDifficult,
      solveCount: solveCount,
      avgRating: avgRating,
      avgSolveDay: avgSolveDay,
      ratingBucket: bucket,
    });
  }, [problems]);

  return (
    <>
      <section>
        <div className="w-10/12 mx-auto my-4 flex justify-end">
          <div className="w-10/12 h-14 mx-auto my-4 flex justify-center items-center">
            <h2 className="text-2xl font-medium ">Problem Solved</h2>
          </div>
          <div className="w-40 h-10 flex p-1 border rounded border-teal-400 text-teal-400 overflow-hidden">
            <select
              className="w-full h-full"
              name="problemFilter"
              id="problemFilter"
              onChange={(e) => setProblemDay(e.target.value)}
            >
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
          </div>
        </div>
        <div className="w-10/12 mx-auto my-4 text-xl shadow-md rounded p-4 grid gap-2">
          <h3>
            Most Difficult Problem :{" "}
            <span>{problemStatus.mostDifficult || 0}</span>
          </h3>
          <h3>
            Solve Count : <span>{problemStatus.solveCount || 0}</span>
          </h3>
          <h3>
            Average Rating Solved : <span>{problemStatus.avgRating || 0}</span>
          </h3>
          <h3>
            Average Solve Day :{" "}
            <span>
              {problemStatus.avgSolveDay !== undefined
                ? problemStatus.avgSolveDay.toFixed(2)
                : 0}
            </span>
          </h3>
        </div>

        <div className="w-10/12 h-96 mx-auto my-4 overflow-x-auto rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={problemStatus.ratingBucket}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Legend />
              <Bar dataKey="count" fill="#00d5be" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
};

export default Problem;
