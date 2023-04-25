const { Thought, User } = require('../models');

const thoughtController = {
  // gets all thoghts 
  getAllThought(req, res) {
    Thought.find({})
    .select("-__v")
    .sort({ _id: -1 })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Get one thought by id
  getThoughtById(req, res){
    Thought.findOne({_id: req.params.thoughtId})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then((thoughtId) => !thoughtId ? res.status(400).json({message: 'No thought found by Id'}) : res.json(thoughtId))
        .catch((err) => res.json(err))
  },
  //udate a thought - lets try with params
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $set: body },
        { new: true, runValidators: true }
    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

  // Delete a thought with params
  deleteThought({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId })
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'no thought with this id'});
      }
    })
    .catch(err => res.json(err));
  },
  
  // create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {runValidators: true, new:true})
    .then((reaction) => !reaction ? res.status(400).json({message: 'No thought with that id'}) : res.json(reaction))
    .catch((err) => res.status(400).json(err))
  },

  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions:{reactionId: req.params.reactionId}}}, {runValidators:true, new:true})
    .then((updatedthought) => !updatedthought ? res.status(400).json({message:'No thought with that id'}) : res.json((updatedthought)))
    .catch((err) => res.status(400).json(err))
}

};

module.exports = thoughtController;

