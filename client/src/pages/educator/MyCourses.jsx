import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [courses, setCourses] = useState(null)
  const navigate = useNavigate()
  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setCourses(data.courses)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return

    try {
      const token = await getToken()
      const { data } = await axios.delete(`${backendUrl}/api/educator/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        toast.success('Course deleted successfully')
        setCourses(prev => prev.filter(c => c._id !== courseId))
      } else {
        toast.error('Failed to delete course')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handleEdit = (courseId) => {
    navigate(`/educator/courses/edit/${courseId}`)
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-hidden'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>Course</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
                <th className='px-4 py-3 font-semibold truncate'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {courses.map((course) => (
                <tr key={course._id} className='border-b border-gray-500/20'>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                    <img src={course.courseThumbnail} 
                    alt="Course" className='w-16 h-12 object-cover rounded' />
                    <span className='truncate hidden md:block'>{course.courseTitle}</span>
                  </td>
                  <td className='px-4 py-3'>
                    {currency} {Math.floor(course.enrolledStudents.length *
                      (course.coursePrice - course.discount * course.coursePrice / 100))}
                  </td>
                  <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                  <td className='px-4 py-3'>{new Date(course.createAt).toLocaleDateString()}</td>
                  <td className='px-4 py-3 space-x-2'>
                    <button
                      onClick={() => handleEdit(course._id)}
                      className='text-blue-600 hover:underline'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className='text-red-600 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses
