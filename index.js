const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const routes = require('./routes/index')
const Admin = require('./models/Admin');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Load environment variables
dotenv.config();

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DBNAME,
  PORT
} = process.env;

const dbUri =`mongodb+srv://premium-fitness:0tiX1BMn7JCPgY73@cluster0.kpbun60.mongodb.net/?retryWrites=true&w=majority`
// const dbUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.pmrvhyt.mongodb.net/${MONGODB_DBNAME}`;
// const dbUri =`mongodb://localhost:27017/premium`
mongoose.connect(dbUri)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
  });

  // Check if there are any admin users
const checkAndCreateDefaultAdmin = async () => {
  const shouldCreateDefaultAdmin = await Admin.checkDefaultAdmin();

  if (shouldCreateDefaultAdmin) {
    const defaultAdminData = {
      username: 'admin',
      password: await bcrypt.hash("Admin", 10), // Remember to hash the password
      mobileNumber: '1234567890',
      email: 'admin@example.com',
      accType: 'Admin'
    };

    try {
      const defaultAdmin = new Admin(defaultAdminData);
      await defaultAdmin.save();
      console.log('Default admin user created.');
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  }
};

// Middleware for parsing request body
app.use(express.json());
app.use(cors());
//Routes
app.use('/api', routes);


app.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
  await checkAndCreateDefaultAdmin();
});
