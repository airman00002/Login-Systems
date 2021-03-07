var express = require("express");
var router = express.Router();

const { body, validationResult } = require("express-validator");
const User = require("../model/model_user");
//TODO----passport----------------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
  // jwt = require("jsonwebtoken"),
  // passportJwt = require("passport-jwt"),
  // jwtStrategy = passportJwt.Strategy,
  // ExtractJwt = passportJwt.ExtractJwt;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/", function (req, res, next) {
  res.render("/");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

//*------------REGISTER---------------------------------------------------------
router.post(
  "/register",
  body("name", "กรุณาระบุชื่อ").not().isEmpty(),
  body("email", "กรุณาระบุอีเมลล์").isEmail(),
  body("password", "กรุณาระบุรหัส").not().isEmpty(),
  function (req, res, next) {
    const result = validationResult(req);
    const errors = result.errors;
    if (!result.isEmpty()) {
      res.render("register", { errors: errors });
    } else {
      var data = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      User.createUser(data, (err) => {
        if (err) throw err;
        res.redirect("/");
      });
    }
  }
);

//*------------LOGIN---------------------------------------------------------
router.post(
  "/login",
  body("username", "กรุณาระบุชื่อ").trim().not().isEmpty(),
  body("password", "กรุณาระบุรหัส").trim().not().isEmpty(),
  function (req, res, next) {
    passport.authenticate(
      "local",
      {
        failureRedirect: "/users/login",
      },
      (err, user, info) => {
        const result = validationResult(req);
        const errors = result.errors;
        if (err) return next(err);
        if (!user) {
          return res.render("login", { errors: errors });
        }
        req.logIn(user, (err) => {
          if (err) return next(err);

          // const token = jwt.sign(
          //   {
          //     _id: user._id,
          //     name: user.name,
          //     email: user.email,
          //   },
          //   "SECRET_KEY"
          // );

          // console.log(`token : ${token}`);
          // res.header("auth-token", token);
          // req.token = token;
          req.flash("success", "เข้าสู่ระบบสำเร็จ");
          res.redirect("/");
        });
      }
    )(req, res, next);
  }
);

router.get("/logout", (req, res, next) => {
  req.logOut();
  res.redirect("/users/login");
});

module.exports = router;
