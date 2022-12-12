import { useState } from 'react'
import { createProject } from '../features/projects/projectSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { reset } from '../features/projects/projectSlice'

function ProjectForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { projects, isLoading } = useSelector(
    (state) => state.projects
  )

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createProject({ text }))
    setText('')
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (projects[0] != null) {
      navigate(`/${projects[0]._id}`)
    }
  }, [user, navigate, isLoading, dispatch, projects])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Project Name</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Project
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProjectForm