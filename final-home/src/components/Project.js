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



const ListContainer = styled.div `

display: flex;
flex-direction: row;
`
 

function Project() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const { user } = useSelector((state) => state.auth)
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
      toast.error(message)
      if (message === 'User not authorized') {
        navigate('/');
      }
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getOneProject( id ))
    return () => {
      dispatch(reset());
    }
  }, [])
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
    <DragDropContext onDragEnd={ onDragEnd }>
    <div className="App">
      <AddUsersButton/> 
      <h2>Your projects</h2>
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
