const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const { successResponse, errorResponse } = require('../middelware/response');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Controller function for admin registration
const registerAdmin = async (req, res) => {
  const { username, password, mobileNumber, email, designation } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json(errorResponse('Admin already exists', 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const admin = new Admin({
      username,
      password: hashedPassword,
      mobileNumber,
      email,
      accType
    });

    // Save the admin to the database
    await admin.save();

    res.status(201).json(successResponse(admin, 'Admin registration successful', 201));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

// Controller function for updating admin details
const updateAdmin = async (req, res) => {
  const adminId = req.query.id;
  const updatedData = req.body;

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json(errorResponse('Admin not found', 404));
    }

    // Update the provided fields
    admin.set(updatedData);
    await admin.save();

    res.status(200).json(successResponse(admin, 'Admin updated successfully', 200));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};


const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, bloodGroup, weight, height, selectedPlan ,age } = req.body;
    const imagePath = req.file ? req.file.path : null;
    
     // Check if the email or phone number is already registered
     const existingUserEmail = await User.findOne({ email });
     const existingUserPhone = await User.findOne({ phoneNumber });
 
     if (existingUserEmail) {
       return res.status(400).json({ message: 'Email is already registered' });
     }
 
     if (existingUserPhone) {
       return res.status(400).json({ message: 'Phone number is already registered' });
     }
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      bloodGroup,
      weight,
      height,
      selectedPlan,
      imagePath,
      age
    });

    await newUser.save();

    res.status(201).json({ message: `Hi ${firstName}, registeration successfull!` });
  } catch (error) {
    res.status(500).json({error});
  }
};


const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }) || await Admin.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password ,user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password!' });
    }

    const token = generateToken(user);
    res.status(200).json(successResponse({user:user,token:token}, 'Login Successfull!', 200));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json(errorResponse("Invalid User!"));

    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      res.status(401).json(errorResponse("Invalid old Password!"));

    }

    const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSameAsOld) {
      return res.status(400).json(errorResponse("New password cannot be the same as the old password!"));
    }

    if(user && isPasswordValid && !isNewPasswordSameAsOld){
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json(successResponse(null, 'Password changed successfully', 200));
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message));

  }
};



module.exports = {
  registerAdmin,
  updateAdmin,
  registerUser,
  login,
  changeUserPassword
};
