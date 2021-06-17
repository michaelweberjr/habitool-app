const { nextDay } = require('date-fns');
const express = require('express');
const path = require('path');

const sessionController = require('../controllers/sessionController.js');

const sessionRouter = express.Router();

//localhost:5000/login/
sessionRouter.get('/', sessionController.checkSession, (req, res) => {
  if(res.locals.doc) return res.status(200).json({ loggedIn: true, doc: res.locals.doc });
  else return res.status(200).json({ loggedIn: false});
});

sessionRouter.delete('/', sessionController.deleteSession, (req, res) => {
  res.status(200).send('Logged Out');
});

module.exports = sessionRouter;
