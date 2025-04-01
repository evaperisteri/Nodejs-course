const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
  console.log("auth service: ", user)
  const payload = {
    username: user.username,
    email: user.email,
    roles: user.roles
  }
  const secret = process.env.TOKEN_SECRET;
  const options = {expiresIn: '1h'};

  return jwt.sign(payload, secret, options);
}

module.exports = {generateAccessToken}