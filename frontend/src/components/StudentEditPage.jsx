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
      <div className="bg-slate-300 m-4">
        <form method="post" ref={element} onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" />
          </div>
          <div>
            <label htmlFor="handle">Handle</label>
            <input type="text" name="handle" id="handle" readOnly />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber" id="phoneNumber" />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input type="text" name="rating" id="rating" readOnly />
            <label htmlFor="maxRating">Max Rating</label>
            <input type="text" name="maxRating" id="maxRating" readOnly />
          </div>
          <div>
            <button type="submit">Update</button>
            <Link to="/students/"> Student Table </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentEditPage;
