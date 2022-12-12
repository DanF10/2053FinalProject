const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getOneUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getOneUser);

module.exports = router