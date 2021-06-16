const db = require('../models/mongooseModel.js');

const habitController = {};

habitController.addHabit = async (req, res, next) => {
  const { email, habit, description, total, startDate, endDate, cadence } = req.body;
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
            streak: 0,
            progress: 0,
            total,
            cadence,
            weekly: [[false, false, false, false, false, false, false]],
            description,
            startDate,
            endDate,
            history: [],
          },
        },
      },
      {
        new: true,
      }
    );
    console.log('updated doc is', updatedDoc);
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
    console.log('\n new doc', updatedDoc);
    res.locals.updatedDoc = updatedDoc;
    return next();
  } catch (e) {
    return next({ err: 'error with removing habit: ' + e });
  }
};

habitController.editHabit = async (req, res, next) => {
  // req.body = { email, habit, newName, newDescription, newTotal, newStartDate, newEndDate}
  const {
    email,
    habit,
    newName,
    newDescription,
    newTotal,
    newStartDate,
    newEndDate,
  } = req.body;
  const cookieValue = req.cookies.SSID;

  // check if cookie matches cookie in db
  const user = await db.User.findOne({ email });
  if (user.cookie !== cookieValue) return res.redirect('/');

  const arr = [newName, newDescription, newTotal, newStartDate, newEndDate];
  const arr2 = ['name', 'description', 'total', 'startDate', 'endDate'];

  const changes = {};
  arr.forEach((el, i) => {
    if (el) {
      Object.assign(changes, { ['habit.$[elem].' + arr2[i]]: el });
    }
  });
  console.log(changes);
  try {
    const updatedDoc = await db.User.findOneAndUpdate({ email }, changes, {
      arrayFilters: [{ 'elem.name': habit }],
      new: true,
    });
    console.log(updatedDoc);
    res.locals.updatedDoc = updatedDoc;
    return next();
  } catch (e) {
    return next({ err: 'err with editing habit: ' + e });
  }
};

module.exports = habitController;
