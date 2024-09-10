const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

const comparePassword = async (password, hashed) => {
    try{
        const match = await bcrypt.compare(password, hashed);
        return match;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    hashPassword,
    comparePassword
} 