const db = require('../models/mongooseModel.js');

const habitController = {};

habitController.addHabit = async (req, res, next) => {
  const { email, habit, description, startDate, endDate, weeklyGoal } = req.body;
  const cookieValue = req.cookies.SSID;
  // console.log(cookieValue);
  // check if cookie matches cookie in db
  const user = await db.User.findOne({ email });
  if(!user) return next({ err: 'cannot find user: ' + email });

  console.log('user found from db', user);
  if (user.cookie !== cookieValue) return res.redirect('/');
  // check if the habit is already there for the user
  const inDB = await db.User.findOne({ email, 'habit.name': habit });
  console.log('if already in db ', inDB);
  if (inDB) return next({ err: 'habit is already in the db for that user' });
  // insert the habit into db if found
  try {
    const updatedDoc = await db.User.findOneAndUpdate(
      { email },
      {
        $push: {
          habit: {
            name: habit,
            weekly: [[]],
            description,
            startDate,
            endDate,
            weeklyGoal,
          },
        },
      },
      {
        new: true,
      }
    );
    console.log('Created doc is', updatedDoc.name);
    res.locals.updatedDoc = updatedDoc;
  } catch (e) {
    return next({ err: 'error with updating the habit: ' + e });
  }
  return next();
};

habitController.removeHabit = async (req, res, next) => {
  // req.body = {email, habit}
  // req.cookies
  const { email, habit } = req.body;
  const cookieValue = req.cookies.SSID;
  // check if cookie matches cookie in db
  const user = await db.User.findOne({ email });
  if (user.cookie !== cookieValue) return res.redirect('/');
  try {
    const updatedDoc = await db.User.findOneAndUpdate(
      { email },
      {
        $pull: { habit: { name: habit } },
      },
      {
        new: true,
      }
    );
    console.log('Removed ' + habit.name + ' from ' + updatedDoc.name);
    res.locals.updatedDoc = updatedDoc;
    return next();
  } catch (e) {
    return next({ err: 'error with removing habit: ' + e });
  }
};

habitController.editHabit = async (req, res, next) => {
  try {
      // req.body = { email, habit, newName, newDescription, newTotal, newStartDate, newEndDate}
    const habit = req.body.habit;
    const cookieValue = req.cookies.SSID;
    const email = req.body.email;

     // check if cookie matches cookie in db
    const user = await db.User.findOne({ email });
    if(!user) return next({ err: 'cannot find user: ' + email })
    if (user.cookie !== cookieValue) return res.redirect('/');

    for(let i = 0; i < user.habit.length; i++) {
      if(user.habit[i].name === habit.name) {
        console.log('Found update match:', habit.name);
        for(let key in habit) {
          user.habit[i][key] = habit[key]; 
        }
      }
    }

    const updatedDoc = await user.save();
      
    console.log('Updated doc: ' + updatedDoc.name + ': ' + habit.name);
    res.locals.updatedDoc = updatedDoc;
    return next();
  } catch (e) {
    return next({ err: 'err with editing habit: ' + e });
  }
};

module.exports = habitController;
