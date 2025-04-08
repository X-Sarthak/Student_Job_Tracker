const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Add a new job application
router.post('/', auth, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      userId: req.user.id
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all job applications
router.get('/', auth, async (req, res) => {
  try {
    const { status, fromDate, toDate } = req.query;
    const filter = { userId: req.user.id };
    
    if (status) filter.status = status;
    if (fromDate || toDate) {
      filter.applicationDate = {};
      if (fromDate) filter.applicationDate.$gte = new Date(fromDate);
      if (toDate) filter.applicationDate.$lte = new Date(toDate);
    }
    
    const jobs = await Job.find(filter).sort('-applicationDate');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a job application
router.patch('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a job application
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;