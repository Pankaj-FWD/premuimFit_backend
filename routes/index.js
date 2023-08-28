const express = require('express');
const { registerAdmin, updateAdmin, registerUser, login, changeUserPassword } = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const { sendWhatsAppMessage } = require('../controllers/sendMessages');
const send_message = require('../controllers/sendMeggasesSDK');


// User registration route
router.post('/register', registerAdmin);
router.put('/updateAdmin', updateAdmin);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/registration', upload.single('image'), registerUser);
router.post('/login', login);
router.post('/change-user-password', changeUserPassword);
router.post('/send-msg', sendWhatsAppMessage);
router.post('/send-sdk', send_message);


// User login route
// router.post('/login', userController.login);

// Protected dashboard route (requires authentication)
// router.get('/dashboard', authenticateJWT, userController.dashboard); // Use the authentication middleware

module.exports = router;
