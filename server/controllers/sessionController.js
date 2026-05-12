const Session = require('../models/Session');

// @desc    Create new session
// @route   POST /api/sessions
// @access  Private
const createSession = async (req, res) => {
  try {
    const { duration, laps } = req.body;

    const session = await Session.create({
      userId: req.user._id,
      duration,
      laps,
      date: new Date()
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all sessions for user
// @route   GET /api/sessions
// @access  Private
const getSessions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sessions = await Session.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Session.countDocuments({ userId: req.user._id });

    res.json({
      sessions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSessions: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single session
// @route   GET /api/sessions/:id
// @access  Private
const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if session belongs to user
    if (session.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if session belongs to user
    if (session.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await session.deleteOne();

    res.json({ message: 'Session removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete all sessions for user
// @route   DELETE /api/sessions
// @access  Private
const deleteAllSessions = async (req, res) => {
  try {
    await Session.deleteMany({ userId: req.user._id });

    res.json({ message: 'All sessions removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  deleteAllSessions
};
