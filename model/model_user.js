var mongo = require("mongodb");
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const url = "mongodb+srv://admin:123456abcd@react-mern-node.z6bkl.mongodb.net/LoginDB?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connect Error"));

//* Create Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = (module.exports = mongoose.model("users", userSchema));

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserById = async (id) => {
  return await User.findById(id);
};

module.exports.getUserByName = async (name) => {
  var query = { name: name };
  return await User.findOne(query);
};

module.exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
