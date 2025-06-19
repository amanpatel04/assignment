import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"


import StudentTable from "./components/StudentTable"
import StudentEditPage from "./components/StudentEditPage"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="students" replace></Navigate>} />
          <Route path="/students" element={<StudentTable />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/edit/:id" element={<StudentEditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
