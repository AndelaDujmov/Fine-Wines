const { Seeder } = require('mongoose-data-seed');
const  User  = require('../models/userSchema');

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
    return User.create(data);
  }
}

module.exports = AdminSeeder;
