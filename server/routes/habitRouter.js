const express = require('express');

const habitController = require('../controllers/habitController.js');
const sessionController = require('../controllers/sessionController.js');
const emailController = require('../controllers/emailController.js');

const habitRouter = express.Router();

//localhost:5000/habit/addHabit
//localhost:5000/habit/get

habitRouter.post(
  '/addHabit',
  habitController.addHabit,
  sessionController.updateSession,
  emailController.sendNewHabitEmail,
  (req, res) => {
    return res.status(200).json({ updatedDoc: res.locals.updatedDoc });
  }
);

habitRouter.post(
  '/removeHabit',
  habitController.removeHabit,
  sessionController.updateSession,
  (req, res) => {
    return res.status(200).json({ updatedDoc: res.locals.updatedDoc });
  }
);

habitRouter.post('/editHabit', habitController.editHabit, (req, res) => {
  return res.status(200).json({ updatedDoc: res.locals.updatedDoc });
});

module.exports = habitRouter;
