const activeSessions = {}; //key:SSID val:true
const sessionController = {};

sessionController.addSession = (req, res, next) => {
  try {
    const { cookie } = res.locals.doc;
    res.cookie('SSID', cookie);
    activeSessions[cookie] = res.locals.doc;
    return next();
  } catch (err) {
    return next({ err: `ERROR:${err}` });
  }
};

sessionController.updateSession = (req, res, next) =>{
  try {
    const { cookie } = res.locals.updatedDoc;
    activeSessions[cookie] = res.locals.updatedDoc;
    return next();
  } catch (err) {
    return next(err);
  }
};

sessionController.checkSession = (req, res, next) => {
  try {
    const cookie = req.cookies.SSID;
    res.locals.doc = activeSessions[cookie];
    console.log('cached data for session',res.locals.doc);
    console.log('Is there an active session?', !!res.locals.doc);
    return next();
  } catch (err) {
    return next({ err: `ERROR:${err}` });
  }
};

module.exports = sessionController;