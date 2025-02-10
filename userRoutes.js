const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUserDetails } = require('../controllers/userController');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', getUserDetails);

module.exports = router;