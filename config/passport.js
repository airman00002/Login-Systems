const User = require("../model/model_user");
//TODO----passport----------------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
  // jwt = require("jsonwebtoken"),
  // passportJwt = require("passport-jwt"),
  // jwtStrategy = passportJwt.Strategy,
  // ExtractJwt = passportJwt.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.getUserById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
passport.use(
  new LocalStrategy(async (username, password, done) => {
    //*
    let user;
    try {
      user = await User.getUserByName(username);

      if (!user) {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }

    try {
      let isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// const options = {};
// options.jwtFromRequest = ExtractJwt.fromHeader('auth-token');
// options.secretOrKey = "SECRET_KEY";

// passport.use(
//   new jwtStrategy(options, async (jwtpayload, done) => {
//     console.log(`payload : ${jwtpayload}`);
//     try {
//       let user = await Users.findOne({ _id: jwtpayload._id });

//       if (user === undefined || user.length === 0) {
//         return done(null, false);
//       }
//       return done(null, user);
//     } catch (error) {
//       return done(error, false);
//     }
//   })
// );

// module.exports.verify_Jwt = (req, res, next) => {
//   const token = req.body.token;
//   console.log(token);
//   // const token = authHeaders.split(" ")[1];

//   if (!token) throw new Error("Not token");
//   try {
//     jwt.verify(token, "SECRET_KEY", (err, decoded) => {
//       if (err) throw err;
//       console.log(decoded);
//       req.decoded = decoded;
//       next();
//     });
//   } catch (error) {
//     console.log(new Error("Error verified token"));
//   }
// };
