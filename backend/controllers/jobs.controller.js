const Job = require('../models/Job.model');


const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort('-applicationDate');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


const addJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};


const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};


const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  getJobs,
  addJob,
  updateJob,
  deleteJob
};