import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const StudentTable = () => {
  const [detailForm, setDetailForm] = useState(false);
  const [handleMessage, setHandleMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [inputHandle, setHandle] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    fetch("/api/user/all")
      .then((response) => response.json())
      .then((data) => setStudents(data.data));
  }, []);

  const handleAddStudent = () => {
    if (handleMessage === "User Found") {
      fetch(`/api/user/add/?handle=${inputHandle}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 201) {
            setStudents([...students, data.data]);
            inputRef.current.value = "";
            setHandle("");
            setHandleMessage("");
            setDetailForm(!detailForm);
          } else {
            setHandleMessage(data.message);
          }
        });
    } else {
      setDetailForm(!detailForm);
    }
  };

  let timeHandler;
  const handleInput = (event) => {
    if (timeHandler !== undefined) {
      setHandleMessage("");
      clearTimeout(timeHandler);
    }
    if (event.target.value < 3) {
      return;
    }
    timeHandler = setTimeout(() => {
      fetch(`/api/user/handle/?handle=${event.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          setHandle(event.target.value);
          if (data.status === "OK") {
            setHandleMessage("User Found");
          } else {
            setHandleMessage(data.message);
          }
        });
    }, 3000);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure ?")) {
      fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200)
            setStudents(students.filter((student) => id !== student._id));
        });
    }
  };

  const downloadCSV = () => {
    const header =
      "firstName,lastName,email,handle,phoneNumber,rating,maxRating\n";
    const rows = students
      .map(
        (s) =>
          `${s.firstName || ""},${s.lastName || ""},${s.email || ""},${
            s.handle || ""
          },${s.phoneNumber || ""},${s.rating || ""},${s.maxRating || ""},`
      )
      .join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "students.csv";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const calculateTimePassed = (time) => {
    const now = new Date();
    const previous = new Date(time);

    const diffInSeconds = Math.floor(
      (now.getTime() - previous.getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const studentsList = students.map((student, index) => {
    return (
      <tr className="h-10  border-b border-blue-300" key={index}>
        <td className="p-1 overflow-hidden">
          {student.firstName} {student.lastName}
        </td>
        <td className="p-1 overflow-hidden">{student.email}</td>
        <td className="p-1 overflow-hidden">{student.phoneNumber}</td>
        <td className="p-1 overflow-hidden text-blue-400">
          <Link to={`/student/profile?handle=${student.handle}`}>
            {student.handle}
          </Link>
        </td>
        <td className="p-1 overflow-hidden">{student.rating}</td>
        <td className="p-1 overflow-hidden">{student.maxRating}</td>
        <td className="p-1 overflow-hidden">
          {calculateTimePassed(student.updatedAt)}
        </td>
        <td className="p-1 overflow-hidden flex flex-row gap-1 justify-between items-center h-full">
          <Link
            to={`/student/edit/${student._id}`}
            className="text-yellow-500 text-3xl shadow w-1/2 flex justify-center"
          >
            <MdEdit />
          </Link>
          <button
            className="text-red-500 text-3xl shadow w-1/2 cursor-pointer flex justify-center"
            onClick={() => {
              handleDelete(student._id);
            }}
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1 className="text-3xl text-black h-24 flex items-center justify-center font-medium">
        Students Table
      </h1>
      <table className="w-10/12 mx-auto table-fixed">
        <thead className="bg-teal-400 text-white h-10">
          <tr>
            <th className="font-normal text-left p-1">Name</th>
            <th className="font-normal text-left p-1">Email</th>
            <th className="font-normal text-left p-1">Phone Number</th>
            <th className="font-normal text-left p-1">Handle</th>
            <th className="font-normal text-left p-1">Rating</th>
            <th className="font-normal text-left p-1">Max Rating</th>
            <th className="font-normal text-left p-1">Sync</th>
            <th className="font-normal text-left p-1">Options</th>
          </tr>
        </thead>
        <tbody>{studentsList}</tbody>
      </table>
      <div className="w-10/12 mx-auto my-1 p-1">
        <div className={detailForm ? "flex gap-4 items-center" : "hidden"}>
          <input
            className="border border-teal-400 rounded h-10 w-96 px-2 focus:outline-none placeholder:text-teal-300 text-teal-400"
            type="text"
            name="handle"
            id="handle"
            placeholder="Enter Handle"
            onChange={handleInput}
            ref={inputRef}
          />

          <p>{handleMessage}</p>
        </div>
      </div>
      <div className="w-10/12 mx-auto h-10 my-1 overflow-hidden flex justify-between">
        <button
          className="w-40 bg-teal-400 text-white font-medium cursor-pointer mx-1"
          onClick={handleAddStudent}
        >
          Add Student
        </button>
        <button
          onClick={downloadCSV}
          className="w-40 bg-teal-400 text-white font-medium cursor-pointer mx-1 flex justify-center items-center"
        >
          Download CSV
        </button>
      </div>
    </>
  );
};

export default StudentTable;
