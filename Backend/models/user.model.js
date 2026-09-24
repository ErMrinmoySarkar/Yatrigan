const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Frist name must be at least 3 characters or more"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters or more"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, "Eamil must be at least 3 characters or more"],
  },

  password: {
    type: String,
    required: true,
    select: false, //to ensure that when user find that time this fild not passed.
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hassPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = model("user", userSchema);

module.exports = userModel;
