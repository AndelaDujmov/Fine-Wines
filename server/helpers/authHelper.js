const bcrypt = require('bcrypt');
const { hash } = require('crypto');

const hashPassword = (password) => {
    return bcrypt.hash(password, 11);
}

const comparePassword = (password, hashed) => {
    return password === hashed;
}

module.exports = {
    hashPassword,
    comparePassword
} 