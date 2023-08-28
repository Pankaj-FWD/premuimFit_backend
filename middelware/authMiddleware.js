const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey= process.env.SECRET_KEY;

// Middleware to authenticate requests
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
