const UserModel = require("../models/user");

const registerNew = (req, res) => {
  res.render("auth/register");
  // res.send("hello");
};

const registerCreate = async (req, res) => {
  // res.json(req.body);
  //save the req.body into db user collection
  console.log("req.body=>", req.body);
  const { email, password } = req.body;
  const user = await UserModel.create({ email, password });
  //this is a shorthand instead of {email: email, password:password}
  res.redirect("/dashboard");
};

module.exports = { registerNew, registerCreate };
