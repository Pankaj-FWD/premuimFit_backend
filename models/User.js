const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  accType: {
    type: String,
    default: "User"
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  selectedPlan: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
  },
});

// Set the user's phoneNumber as the default password using Mongoose pre middleware
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const hashedPassword = await bcrypt.hash(this.phoneNumber, 10);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
