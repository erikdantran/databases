var models = require('../models');

// non-orm version
module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    models.messages.getAll( (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(JSON.stringify(results));
      }
    });
  },

  // a function which handles posting a message to the database
  post: function (req, res) {
    var data = req.body;
    models.messages.create(data, (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(201).end('Message received');
      }
    });
  }
};

// orm version couldnt get it to work
// module.exports = {
//   messages: {
//     get: function(req, res) {
//       Messages.findAll( { include: Usernames} )
//         .complete(function(err, results) {
//           // handle err
//           res.json(results);
//         });
//     },

//     post: function (req, res) {
//       Usernames.findOrCreate({username: req.body[username]})
//         .complete(function (err, user) {
//           var params = {
//             message: req.body[message],
//             usernameId: user.id,
//             roomname: req.body [roomname]
//           };
//           Messages.create(params)
//             .complete(function (err, results) {
//               res.sendStatus(201);
//             });
//         });
//     }
//   }
// };