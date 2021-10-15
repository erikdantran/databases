var mysql = require('mysql2');
var Sequelize = require('Sequelize');
// var orm = new Sequelize('chat', 'root', '');

// orm version couldnt get it to work
// var Usernames = orm.define('Usernames', {
//   username: Sequelize.STRING
// });

// var Messages = orm.define('Messages', {
//   messages: Sequelize.STRING,
//   roomname: Sequelize.STRING
// });

// Usernames.hasMany(Messages);
// Messages.belongsTo(Usernames);

// Usernames.sync();
// Messages.sync();

// exports.Usernames = Usernames;
// exports.Messages = Messages;

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'


// Needed in non-orm version
exports.pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'chat',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

