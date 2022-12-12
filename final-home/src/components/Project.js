import React, { useEffect } from 'react';
import TrelloList from './TrelloList';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { getOneProject, updateProject, reset } from '../features/projects/projectSlice';
import Spinner from './Spinner';
import AddUsersButton from './addUsersButton';
import '../styles/projectsCSS.css';
import {slide as Menu} from 'react-burger-menu'



const ListContainer = styled.div `

display: flex;
flex-direction: row;
`
 

function Project() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const { user } = useSelector((state) => state.auth)
  console.log(user);
  const {projects, isLoading, isError, message} = useSelector((state) => state.projects);
  const onDragEnd = (result) => {
    //dragableId = object being dragged, destination.index = new array index, droppableId = listId,
    //source.index = original array index, type = default if dragging task, list if dragging lists
    const { destination, source, draggableId, type} = result;

    if(!destination){
      return;
    }
    dispatch(updateProject({data:{dragData: result}, projectId: id}));
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message)
      if (message === 'User not authorized') {
        navigate('/login');
      }
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getOneProject( id ))
    return () => {
      dispatch(reset());
    }
  }, [isError, message])
  //[user, navigate, isError, message, dispatch]

  var sections;
  if (projects[0]) {
    sections = projects[0].sections;
  }
  else {
    sections = [];
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>     
    <Menu width={200}>
    <a id="home" className="menu-item" href="/">Home</a>
    <a id="projects" className="menu-item" href="/projects">Projects</a>
    <a id="tasks" className="menu-item" href="/tasks">Tasks</a>
  </Menu>
    <DragDropContext onDragEnd={ onDragEnd }>
    <div className="project-container">
      <AddUsersButton/> 
      <h2>Your project</h2>
      <Droppable droppableId = "all-lists" direction = "horizontal" type = "list">
        {provided => (
      <ListContainer {...provided.droppableProps} ref = {provided.innerRef}>
      { sections.map((list, index) =>( <TrelloList 
      listID={list._id}
      key = {list._id} 
      title={list.text} 
      cards = {list.tasks}
      index = {index}
      projectId = {id}/>
      ))}
      {provided.placeholder}
      <TrelloActionButton list projectId={id}/>
      </ListContainer>
        )}
      </Droppable>

    </div>
    </DragDropContext>
    </div>
  );
}

const mapStateToProps = state => ({
  lists: state.lists
})

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row"
  }
};

export default connect(mapStateToProps) (Project);
