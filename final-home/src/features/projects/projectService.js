import axios from 'axios'

const API_URL = '/api/projects/'

// Create new project
const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, projectData, config)
  return response.data
}

// Get user projects
const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const getOneProject = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + id, config)

  return response.data
}

// Update user project
const updateProject = async (projectData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const projectId = projectData.projectId;
    const response = await axios.put(API_URL + projectId, projectData.data, config)
  
    return response.data
  }

// Delete user project
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + projectId, config)

  return response.data
}

const projectService = {
  createProject,
  getProjects,
  getOneProject,
  updateProject,
  deleteProject,
}

export default projectService