const Thought  = require("../models/thought");

module.exports = {

  //Get all thoughts
  async getThoughts(req,res) {
    try{
      const thought = await Thought.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
   // Get one thought
   async getThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "Not a thought" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
   },  
    // Create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      return res.status(200).json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
   // Update thought
   async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Not a thought" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "Not a thought" });
      }

      res.status(200).json({
      message: "Thought & reactions were deleted",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add reaction
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "Not a thought " });
      }

       res.status(200).json(reaction);
     } catch (err) {
       res.status(500).json(err);
    }
  },
  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: "not a thought and reaction ID" });
      }

      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
