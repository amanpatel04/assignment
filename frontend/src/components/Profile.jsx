import { useState } from "react"

import Contest from "./Contest"
import Problem from "./Problem"

const Profile = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="w-10/12 flex gap-2 mx-auto my-4 h-16">
        <button className="w-1/4 h-full bg-green-400 text-white cursor-pointer text-2xl" onClick={handleToggle}>Contest History</button>
        <button className="w-1/4 h-full bg-blue-400 text-white cursor-pointer text-2xl" onClick={handleToggle}>Problem Solved</button>
      </div>
      {toggle ? <Contest /> : <Problem />}
    </>
  );
};

export default Profile;
