import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { MdEdit } from 'react-icons/md';
import { CiCircleMore } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const StudentTable = () => {

  const [detailForm, setDetailForm] = useState(false)
  const [handleMessage, setHandleMessage] = useState('')
  const [students, setStudents] = useState([])
  const [inputHandle, setHandle] = useState('')
  const inputRef = useRef();

  useEffect(() => {
    fetch('/api/user/all')
      .then(response => response.json())
      .then(data => setStudents(data.data))
  }, [])

  const handleAddStudent = () => {
    if (handleMessage === 'User Found') {
      fetch(`/api/user/add/?handle=${inputHandle}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 201) {
          setStudents([...students, data.data])
          inputRef.current.value = ''
          setHandle('')
          setHandleMessage('')
          setDetailForm(!detailForm)
        } else {
          setHandleMessage(data.message)
        }
      })
    } else {
      setDetailForm(!detailForm)
    }
  }

  let timeHandler;
  const handleInput = (event) => {
    if (timeHandler !== undefined) {
      setHandleMessage('')
      clearTimeout(timeHandler)
    }
    if (event.target.value < 3) {
      return;
    }
    timeHandler = setTimeout(() => {
      fetch(`/api/user/handle/?handle=${event.target.value}`)
      .then(response => response.json())
      .then((data) => {
        setHandle(event.target.value)
        if (data.status === 'OK') {
          setHandleMessage('User Found')
        } else {
          setHandleMessage('User Not Found')
        }
      })
    }, 3000)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure ?")) {
      fetch(`/api/user/delete/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 200)
          setStudents(students.filter((student) => id !== student._id))
      })
    }
  }

  const studentsList = students.map((student, index) => {
    return (
      <tr className='h-10  border-b border-blue-300' key={index}>
            <td className='p-1 overflow-hidden'>{student.firstName} {student.lastName}</td>
            <td className='p-1 overflow-hidden'>{student.email}</td>
            <td className='p-1 overflow-hidden'>{student.phoneNumber}</td>
            <td className='p-1 overflow-hidden'>{student.handle}</td>
            <td className='p-1 overflow-hidden'>{student.rating}</td>
            <td className='p-1 overflow-hidden'>{student.maxRating}</td>
            <td className='p-1 overflow-hidden flex flex-row gap-0.5'>
              <Link to={`/student/edit/${student._id}`} className='bg-red-400 aspect-square text-3xl'>
                <MdEdit />
              </Link>
              <button className='bg-green-400 aspect-square text-3xl' onClick={()=>{handleDelete(student._id)}}>
                <MdDelete />
              </button>
              <Link to={`/student/details/${student._id}`} className='bg-blue-400 aspect-square text-3xl'>
                <CiCircleMore />
              </Link>
            </td>
          </tr>
    )
  })

  return (
    <>
      <h1 className='text-3xl text-black h-24 flex items-center justify-center font-medium'>Students Table</h1>
      <table className='w-10/12 mx-auto table-fixed'>
        <thead className='bg-blue-400 text-white h-10'>
          <tr>
            <th className='font-normal text-left p-1'>Name</th>
            <th className='font-normal text-left p-1'>Email</th>
            <th className='font-normal text-left p-1'>Phone Number</th>
            <th className='font-normal text-left p-1'>Handle</th>
            <th className='font-normal text-left p-1'>Current Rating</th>
            <th className='font-normal text-left p-1'>Max Rating</th>
            <th className='font-normal text-left p-1'>Deatils</th>
          </tr>
        </thead>
        <tbody>
          { studentsList }
        </tbody>
      </table>
      <div className='w-10/12 mx-auto my-1 p-1'>
        <div className={detailForm ? 'flex gap-4 items-center' : 'hidden'}>
          <input className='border border-teal-400 rounded h-10 w-96 px-2 focus:outline-none placeholder:text-teal-300 text-teal-400' type="text" name="handle" id="handle" placeholder='Enter Handle' onChange={handleInput} ref={inputRef}/> 

          <p>{handleMessage}</p>
        </div>
      </div>
      <div className='w-10/12 mx-auto h-10 my-1 overflow-hidden flex justify-between'>
        <button className='w-40 bg-teal-400 text-white font-medium cursor-pointer mx-1' onClick={handleAddStudent}>Add Student</button>
        <Link to='/download' className='w-40 bg-teal-400 text-white font-medium cursor-pointer mx-1 flex justify-center items-center'>Download CSV</Link>
      </div>
      
    </>
  )
}

export default StudentTable