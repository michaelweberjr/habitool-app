const db = require('../models/mongooseModel.js');
const bcrypt = require('bcryptjs');

//SENDGRID API/SETUP//
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);

const signupController = {};

signupController.addUser = async (req, res, next) => {
  // req.body = { email: password: full_name:}
  const { email, password, name } = req.body;
  console.log('Signing Up',name, email, password);
  // []
  try {
    const results = await db.User.find({ email });
    if (results.length) return next({ err: 'email has already been used' });
  } catch (e) {
    return next({ err: 'error with searching db for email: ' + e });
  }
  const hashedPass = await bcrypt.hash(password, 5);
  const cookie = await bcrypt.hash(name, 5);
  try {
    await db.User.create({
      email,
      password: hashedPass,
      name,
      cookie,
      habit: [],
    });

  } catch (e) {
    return next({ err: 'error with inserting into user collection: ' + e });
  }
  res.locals.doc = {name, email, cookie, habit: []};
  return next();
};


signupController.sendSignupEmail = async (req, res, next) => {
  const { email, name } = req.body;
  console.log(`about to send an email to ${email}`);

  

  const htmlMessage = `<div style="background-image: url(https://www.verywellfit.com/thmb/pKPO5vlndEhVh_AD3-9YtdL5uKc=/2121x1193/smart/filters:no_upscale()/GettyImages-1061745418-e91c3dd01a0f4dc3a8a80f12222a0644.jpg)"><h1>Welcome to Habitool, ${name}!</h1><p>Thanks for joining the Habitool community, where tens of people are making healthy aspirations a reality.</p></div>`;

  const msg = {
    to: email, // recipient
    from: 'habittool@gmail.com', // verified sender
    subject: 'Welcome to Habitool!',
    text: 'Habitool wadbabfgiawbg', // ? is this field necessary?
    html: htmlMessage,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      return next();
    })
    .catch((error) => {
      console.error(error);
      return next({ err: 'error sending signup email to: ' + error });
    });
};

// signupController.addUser = async (req, res, next) => {
//   // req.body = { username: 'rabbit', password: 'carrot'}
//   const { username, password } = req.body;

//   const searchQuery = "SELECT username FROM users where username = $1";
//   const searchParams = [username];
//   try {
//     const { rowCount } = await db.query(searchQuery, searchParams);
//     console.log("number of matches in db", rowCount);
//     if (rowCount)
//       return next({ err: "error with username found already in db" });
//   } catch (e) {
//     return next({ err: "error with searching username in db: " + e });
//   }

//   const hashedPass = await bcrypt.hash(password, 5);
//   const cookie = username + " hello cookie";
//   // insert into db
//   const insertQuery =
//     "INSERT INTO users (username, password, cookie) VALUES ($1, $2, $3)";
//   const insertParams = [username, hashedPass, cookie];
//   const createTableQuery = `CREATE TABLE ${username}_history(id SERIAL PRIMARY KEY, date varchar NOT NULL, habit_id int NOT NULL, task_id int NOT NULL, description varchar, requirement int, completion int DEFAULT 0, isWeekly int DEFAULT 0, CONSTRAINT fk_habit FOREIGN KEY (habit_id) REFERENCES habit(id) ON DELETE cascade, CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE cascade )`;
//   try {
//     await db.query(insertQuery, insertParams);
//     await db.query(createTableQuery);
//   } catch (e) {
//     // fill in error message
//     return next({ err: "error with db query in addUser: " + e });
//   }
//   console.log("successfully signuped");
//   res.locals.username = username;
//   res.cookie("SSID", cookie);
//   return next();
// };

module.exports = signupController;
