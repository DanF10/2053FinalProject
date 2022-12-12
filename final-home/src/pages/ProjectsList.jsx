import React, {useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProjects, createProject, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import ProjectCard from '../components/ProjectCard'

const ProjectsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [text, setText] = useState('')
    const { user } = useSelector((state) => state.auth)
    const {projects, isLoading, isError, message} = useSelector((state) => state.projects);

    const onSubmit = (e) => {
      e.preventDefault()
      dispatch(createProject({ text }))
      setText('')
    }

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (!user) {
          navigate('/login')
        }
    
        dispatch(getProjects())
        return () => {
          dispatch(reset());
        }
      }, [])

      if (isLoading) {
        return <Spinner/>
      }
    return (
        <div>
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
          {projects.map((project) => (
              <ProjectCard
                  key={project._id}
                  id={project._id}
                  name={project.text}
              />
          ))}
        </div>
    )
}

export default ProjectsList