const express = require('express');
const router = express.Router();
const { getProjects, setProject, updateProject, deleteProject, getOneProject } = require('../controllers/projectController')
const { protect } = require('../middleware/authMiddleware');
router.route('/').get(protect, getProjects).post(protect, setProject);
router.route('/:id').delete(protect, deleteProject).put(protect, updateProject).get(protect, getOneProject);

module.exports = router;