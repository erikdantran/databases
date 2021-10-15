var models = require('../models');

// non orm version
module.exports = {
  get: function (req, res) {
    models.users.getAll( (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(JSON.stringify(results));
      }
    });
  },

  post: function (req, res) {
    var data = req.body;
    models.users.create(data, (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send('User received');
      }
    });
  }

};

// orm version couldnt get it to work
// module.exports = {
//   messages: {
//     get: function(req, res) {
//       Usernames.findAll()
//         .complete(function(err, results) {
//           // handle err
//           res.json(results);
//         });
//     },

//     post: function (req, res) {
//       Usernames.create({username: req.body[username]})
//         .complete(function (err, user) {
//           res.sendStatus(201);
//         });
//     }
//   }
// };