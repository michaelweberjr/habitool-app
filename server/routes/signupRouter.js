const express = require('express');
const path = require('path');
const sessionController = require('../controllers/sessionController.js');

const signupController = require('../controllers/signupController.js');

const signupRouter = express.Router();
signupRouter.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../../dist/index.html'));
});

signupRouter.post('/', signupController.addUser, sessionController.addSession, (req, res) => {
  console.log('sending response');
  res.status(200).json({ result: 'pass' });
});

module.exports = signupRouter;
