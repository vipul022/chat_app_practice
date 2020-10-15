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
    .catch(done);
};
