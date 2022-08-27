const jwt = require('jsonwebtoken');

module.exports = generateToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1800s' });
}