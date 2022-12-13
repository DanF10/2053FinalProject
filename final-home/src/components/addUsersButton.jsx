import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, reset } from '../features/auth/authSlice'
import { updateProject } from '../features/projects/projectSlice';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

function VerticallyCenteredModal(props) {
  let { id } = useParams();
  const dispatch = useDispatch()
  
  const [text, setText] = useState('')

  const {projects, isLoading} = useSelector((state) => state.projects);
  const { addedUsers } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    props.onHide();
    dispatch(getOneUser({email: text, projectId: id}));
    if (addedUsers.length !== 0) {
      dispatch(updateProject({data:{user: addedUsers[0]}, projectId: id}))
      dispatch(reset());
    }
  } 

  if(isLoading) {
    return <Spinner />
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={text}
              placeholder='Enter the user email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
        <div className='users-list'>
          <h1>Users already invited to Project</h1>
          <ul>
          {projects[0] ? projects[0].users.map((user) => {
            return(<li>{user.name}</li>)
          }) : <li></li>}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function AddUsersButton() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Users
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default AddUsersButton;