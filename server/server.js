require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 5000;

const sessionRouter = require('./routes/sessionRouter.js');
const signupRouter = require('./routes/signupRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const habitRouter = require('./routes/habitRouter.js');
const taskRouter = require('./routes/taskRouter.js');

app.use(express.json());
app.use(cookieParser());

/**
 * Route Handlers
 */

app.use('/session', sessionRouter);
app.use('/task', taskRouter);
app.use('/habit', habitRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

/**
 * Static File Handler
 */

// app.use(express.static(path.resolve(__dirname, "../client")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/")); // fill the path later
// });

/**
 * Default Route Handler
 */
app.use('*', (req, res) => res.status(404).send('Page Not Found'));

/**
 * Default Error Handler
 */
app.use((e, req, res, next) => {
  const defaultErr = {
    status: 500,
    err: 'An error occurred',
  };
  const errorObj = Object.assign({}, defaultErr, e);
  console.log(errorObj.err);
  return res.status(errorObj.status).json(errorObj.err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
