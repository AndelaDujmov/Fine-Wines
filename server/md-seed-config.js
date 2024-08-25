const mongoose = require('mongoose');
const AdminSeeder = require('./seeders/admin.seeder'); // Use standard require

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  AdminSeeder,
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () => {
  await mongoose.connect("mongodb+srv://andeladujmov3:WHC9AM6xCx0QovF1@cluster0.vgredfc.mongodb.net/finewines?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
};

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = {
  seedersList,
  connect,
  dropdb,
};
