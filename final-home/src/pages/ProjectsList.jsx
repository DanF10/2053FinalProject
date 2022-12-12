import React, {useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProjects, createProject, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import ProjectCard from '../components/ProjectCard'
import styled from 'styled-components';
import '../styles/projectsCSS.css';
import {slide as Menu} from 'react-burger-menu'

// const ProjButton = styled.div `
// display: inline-grid;
// grid-direction: row;
// `


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
        <div className='project-wrap'>         
     <Menu width={200}>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="projects" className="menu-item" href="/projects">Projects</a>
        <a id="tasks" className="menu-item" href="/tasks">Tasks</a>
      </Menu>
      <div className='project-h1'>
        <h1>Projects</h1>
      </div>
      
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
          <div className = 'overflow-button'>
          {/* <ProjButton> */}
          {projects.map((project) => (
            <div className = 'overflow-button2'>
              <ProjectCard
                  key={project._id}
                  id={project._id}
                  name={project.text}
              />
              </div>
              
          ))}
          </div>
        </div>
    )
}

export default ProjectsList