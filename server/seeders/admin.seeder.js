const { Seeder } = require('mongoose-data-seed');
const  User  = require('../models/userSchema');
const { hashPassword } = require('../helpers/authHelper');

const data = [{
  firstName: 'Anđela', 
  lastName: 'Dujmov', 
  username: 'adujmov99', 
  email: 'andela@gmail.com', 
  password: 'Andela12345', 
  isAdmin: true
}];

class AdminSeeder extends Seeder {
  async run() {
    for (let i = 0; i < data.length; i++) {
      data[i].password = await hashPassword(data[i].password);
    }
    
    return User.create(data);
  }
}

module.exports = AdminSeeder;
