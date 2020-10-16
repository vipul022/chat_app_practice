const UserModel = require("../models/user");
const passport = require("passport");

const registerNew = (req, res) => {
  console.log("registerNew=>", req.body);
  res.render("auth/register");
  // res.send("hello");
};

const registerCreate = async (req, res, next) => {
  // res.json(req.body);
  //save the req.body into db user collection
  // console.log("req.body=>", req.body);
  // const { email, password } = req.body;
  // const user = await UserModel.create({ email, password });
  // //this is a shorthand instead of {email: email, password:password}

  // res.redirect("/dashboard");
  const newUserHandler = (user) => {
    console.log("newUserHandler=>", user);
    //re.login is provided by passport
    req.login(user, (err) => {
      if (err) {
        console.log("if");
        next(err);
      } else {
        console.log("else=>");
        res.redirect("/dashboard");
      }
    });
  };
  console.log("registerCreate req.body=>", req.body);
console.log("registerCreate req.user", req.user)
  const { email, password } = req.body;

  UserModel.create({ email, password }).then(newUserHandler);
  //.then(user) => newUserHandler(user) line 29 is a short hand for .then
};

const logOut = (req, res) => {
  // console.log("req.session=>", req);
  req.logout();
  //logout( is provided by passport)
  res.redirect("/");
};

const loginNew = (req, res) => {
  res.render("auth/login");
};

const loginCreate = async (req, res, next) => {
  // console.log("req.session=>", req);
  const loginFunc = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "login",
  });

  loginFunc(req, res, next);
};
module.exports = { registerNew, registerCreate, loginNew, logOut, loginCreate };

// passport.authenticate('local', {
//         successRedirect: "/dashboard",
//         failureRedirect: "/login"
// }))
