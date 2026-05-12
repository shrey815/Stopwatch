const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  deleteAllSessions
} = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createSession)
  .get(protect, getSessions)
  .delete(protect, deleteAllSessions);

router.route('/:id')
  .get(protect, getSession)
  .delete(protect, deleteSession);

module.exports = router;
