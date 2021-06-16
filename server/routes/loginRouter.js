const express = require('express');
const path = require('path');

const loginController = require('../controllers/loginController.js');
const sessionController = require('../controllers/sessionController.js');
const loginRouter = express.Router();

//localhost:5000/login/
loginRouter.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../../dist/index.html'));
});

loginRouter.post(
  '/',
  loginController.login,
  sessionController.addSession,
  (req, res) => {
    return res.status(200).json({ loggedIn: true, doc: res.locals.doc });
  }
);

module.exports = loginRouter;
