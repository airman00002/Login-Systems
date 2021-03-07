var express = require("express");
var router = express.Router();
const passport = require("passport"),
  jwt = require("jsonwebtoken");
  // const {verify_Jwt}= require('../config/passport')

/* GET home page. */
router.get(
  "/",
  enSureAuthenticated,

  function (req, res, next) {
    res.render("index", { user: req.user });
  }
);

function enSureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

router.get(
  "/members",
  
  (req, res, next) => {
    res.render("members")
  }
);

module.exports = router;
