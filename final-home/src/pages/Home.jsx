import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {slide as Menu} from 'react-burger-menu'
import { useSelector, useDispatch } from 'react-redux'
import { getProjects, reset } from '../features/projects/projectSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/homeCSS.css'


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [weekendsVisible, setWeekendsVisible] = useState(true);

    const {user} = useSelector((state) => state.auth);
    const {projects} = useSelector((state) => state.projects)
    
    useEffect(() => {
      if (!user) {
        navigate('/login')
      }
  
      dispatch(getProjects())
      return () => {
        dispatch(reset());
      }
    }, [])
    const taskArray = [];
    for (let i = 0; i < projects.length; i++) {
      for (let j = 0; j < projects[i].sections.length; j++) {
        for (let k = 0; k < projects[i].sections[j].tasks.length; k++) {
          const task = projects[i].sections[j].tasks[k]
          if (task.endDate)
            taskArray.push({id: task._id, title: task.text, date: task.endDate.substring(0,task.endDate.indexOf("T"))})
          else
          taskArray.push({id: task._id, title: task.text, date: ""})
          }
      }
    }

    return (
        <div className='demo-app-main'>
          <Menu width={200}>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="projects" className="menu-item" href="/projects">Projects</a>
            <a id="tasks" className="menu-item" href="/tasks">Tasks</a>
            <a id="chat" className="menu-item" href="/chat">Chat</a>
          </Menu>
          <div className="home-h1">
            <h1>Home</h1>
          </div>
          {taskArray !== [] && <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            height={700}
            editable={false}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={taskArray}
          />}
        </div>
    )
}

