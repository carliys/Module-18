const { Thought, User } = require('../models');

const userController = {

  // Get all users
  getAllUser(req, res) {
    User.find({})
    .select("-__v")
    .sort({ _id: -1 })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById(req,res){
    User.findOne({ _id: req.params.userId })
        .populate({
            path: 'thoughts',
        })
        .populate({
            path: 'friends',
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
      });
    },

// create a user
createUser(req, res) {
  User.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => {
    return res.status(400).json(err);
        });
    },

  // update user with params
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
        { _id: params.UserId },
        { $set: body },
        { new: true, runValidators: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No userfound with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

// delete a thoght with params
deleteUser({ params }, res) {
  User.findOneAndUpdate({ _id: params.userId })
  .then(deletedUser => {
    if (!deletedUser) {
      return res.status(404).json({ message: 'no user with this id'});
    }
    return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
  }).then(() => {
      res.json({ message: "user and associated thoughts have been deleted!" })
  })
  .catch(err => res.json(err));
},

// add friend
addFriend(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true, runValidators: true})
  .then((user) => !user ? res.status(400).json({message: 'No user with that Id'}) : res.json(user))
  .catch((err) => res.status(400).json(err));
},

  // delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
    .then((user) => !user ? res.status(400).json({message: 'No user with that Id'}) : res.json(user))
    .catch((err) => res.status(400).json(err));
  }
};

module.exports = userController;


