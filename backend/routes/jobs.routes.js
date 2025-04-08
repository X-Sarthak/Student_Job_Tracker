const express = require('express');
const {
  getJobs,
  addJob,
  updateJob,
  deleteJob
} = require('../controllers/jobs.controller');

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(addJob);

router.route('/:id')
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;