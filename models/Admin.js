const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  accType: {
    type: String,
    default: "Admin"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

adminSchema.statics.checkDefaultAdmin = async function () {
  const adminCount = await this.countDocuments();
  return adminCount === 0;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
