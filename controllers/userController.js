const User  = require("../models/user");

module.exports = {
  // Get all users
  async getUsers(req,res) {
    try {
      const users = await User.find()
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
    async getUser(req, res) {
      try{
      const user = await User.findOne({ _id: req.params.userId })
        
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
          if (!user){
            return res.status(404).json({ message: "No User find with that ID!" })
          } 
          res.json(user)
      }   catch(err) { 
          res.status(500).json(err);
    }
}, 

// create a new user
async createUser(req, res) {
  try {
    const dbUserData = await User.create(req.body);
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
},
// update user
async updateUser(req, res) {
  try{
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
  );
    if (!user) {
      return res.status(404).json({ message: "No User find with this ID!" })
    }    
    res.json(user)
  } catch(err) {
    res.status(500).json(err);
  }
},
// delete user
async deleteUser(req, res) {
  try {
  const user = await User.findOneAndDelete({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json({ message: "No User found with this ID!" })
      } 
      if (user) {
        res.status(200).json({ message: "User and Thought deleted!" })
      }
      }  catch (err) {
          res.status(500).json(err);
        }
},
 
//add a friend
async addFriend(req, res) {
  try {
  const friend = await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  );

    if (!friend) {
      
        return res.status(404).json({ message: "No friend found with this ID!" })
    }
        res.json(friend)
    }   catch(err) {
        res.status(500).json(err);
    }
}, 
//delete friend
async deleteFriend(req, res) {
  try{
  const friend = await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  );
    
     if (!friend) {
          return res.status(404).json({ message: "No friend found with this ID!" })
     }
          res.json(friend);
        } catch(err) {
          res.status(500).json(err);
        }
}
 };