import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";

const StudentEditPage = () => {
  const element = useRef();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        element.current.firstName.value = data.data.firstName || "";
        element.current.lastName.value = data.data.lastName || "";
        element.current.handle.value = data.data.handle || "";
        element.current.email.value = data.data.email || "";
        element.current.phoneNumber.value = data.data.phoneNumber || "";
        element.current.rating.value = data.data.rating || "";
        element.current.maxRating.value = data.data.maxRating || "";
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    fetch(`/api/user/update/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then((data) => {
      alert(data.message)
    })
  };

  return (
    <>
      <div className="m-4 w-6/12 mx-auto p-4 shadow-2xl rounded mt-30">
        <form method="post" ref={element} onSubmit={handleSubmit} encType="application/x-www-form-urlencoded" className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-4 gap-2">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" className="border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1"/>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" className="border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <label htmlFor="handle" className="col-span-1">Handle</label>
            <input type="text" name="handle" id="handle" readOnly className="col-span-3 border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <label htmlFor="email" className="col-span-1">Email</label>
            <input type="email" name="email" id="email" className="col-span-3 border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <label htmlFor="phoneNumber" className="col-span-1">Phone Number</label>
            <input type="text" name="phoneNumber" id="phoneNumber" className="col-span-3 border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <label htmlFor="rating" className="col-span-1">Rating</label>
            <input type="text" name="rating" id="rating" readOnly className="col-span-3 border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1" />
            <label htmlFor="maxRating" className="col-span-1">Max Rating</label>
            <input type="text" name="maxRating" id="maxRating" readOnly className="col-span-3 border border-slate-200 rounded focus:outline-none focus:border focus:border-teal-400 pl-1"/>
          </div>
          <div className="flex justify-center gap-10 mt-10">
            <button type="submit" className="bg-teal-400 w-40 h-12 flex justify-center items-center rounded text-white font-semibold cursor-pointer">Update</button>
            <Link to="/students/" className="bg-teal-400 w-40 h-12 flex justify-center items-center rounded text-white font-semibold "> Student Table </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentEditPage;
