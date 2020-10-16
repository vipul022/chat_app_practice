const authRedirect = (req, res, next) => {
  console.log("authRedirect=>", req.user);
  if (req.user) {
    return res.redirect("/dashboard");
  }
  // next points to next peice of code that should be executed, could be another middleware or controller function for that route
  return next();
};

function authorise(req, res, next) {
  console.log("authorise req=>", req.user);
  if (req.user) {
    return next();
  }

  return res.redirect("/");
}

module.exports = {
  authRedirect,
  authorise,
};
