const LocalStrategy = require("passport-local");
const passport = require("passport");
const UserModel = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user._id);
});
// serializeUser() method stores information inside of our session relating to the passport user.

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => done(null, user))
    .catch(done);
});

const canLogin = (user, password) => {
  if (user) {
    return user.verifyPasswordSync(password); // mongoose-bcrypt function
  } else {
    return false;
  }
};

const verifyCallback = (email, password, done) => {
  UserModel.findOne({ email })
    .then((user) => {
      if (canLogin(user, password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(done); //error handling
};

const fields = { usernameField: "email" };

passport.use(new LocalStrategy(fields, verifyCallback));
