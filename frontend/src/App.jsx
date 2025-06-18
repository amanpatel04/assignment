import {BrowserRouter, Routes, Route} from "react-router-dom"


import StudentTable from "./components/StudentTable"
import StudentEditPage from "./components/StudentEditPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/students" element={<StudentTable />} />
          <Route path="/student/edit/:id" element={<StudentEditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
