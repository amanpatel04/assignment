import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Contest = () => {
  const [contests, setContests] = useState([]);
  const [contestDay, setContestDay] = useState(30);

  const [searchParams] = useSearchParams();
  const handle = searchParams.get("handle");

  useEffect(() => {
    const params = new URLSearchParams({
      handle: handle,
      day: contestDay,
    });
    fetch(`/api/contest/list/?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        // data.data.reverse();
        setContests(data.data);
      });
  }, [contestDay, handle]);

  const contestList = contests.map((contest) => {
    return (
      <tr className="hover:bg-gray-50" key={contest._id}>
        <td className="px-4 py-2 text-sm text-gray-800">{contest.contestId}</td>
        <td className="px-4 py-2 text-sm text-gray-800">
          {contest.contestName.length > 35
            ? `${contest.contestName.slice(0, 35)}...`
            : contest.contestName}
        </td>
        <td className="px-4 py-2 text-sm text-gray-800">{contest.rank}</td>
        <td className="px-4 py-2 text-sm text-gray-800">-</td>
        <td className="px-4 py-2 text-sm text-gray-800">
          {contest.newRating - contest.oldRating}
        </td>
        <td className="px-4 py-2 text-sm text-gray-800">{contest.newRating}</td>
      </tr>
    );
  });

  const contestDayTime = (payload) => {
    const date = new Date(payload.ratingUpdateTimeSeconds * 1000);
    const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
    const year = date.getFullYear();
    return `${month} ${year % 100}`;
  };

  return (
    <>
      <section className="">
        <div className="w-10/12 h-14 mx-auto my-4 flex justify-center items-center">
          <h2 className="text-2xl font-medium ">Contest History</h2>
        </div>
        <div className="w-10/12 mx-auto my-4 flex justify-end">
          <div className="w-40 h-10 flex p-1 border rounded border-teal-400 text-teal-400 overflow-hidden">
            <select
              className="w-full h-full"
              name="contestFilter"
              id="contestFilter"
              onChange={(e) => setContestDay(e.target.value)}
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">365 days</option>
            </select>
          </div>
        </div>
        <div className="w-10/12 h-96 mx-auto my-4 overflow-x-auto rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={contests}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="0 0" vertical={false} />
              <XAxis
                dataKey={contestDayTime}
                interval={Math.ceil(contests.length / 12)}
              />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="newRating" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-md w-10/12 mx-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-teal-400">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Contest
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Rank
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Solved
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Rating Change
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  New Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">{contestList.reverse()}</tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Contest;
