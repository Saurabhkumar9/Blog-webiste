const Follow = require("../models/follow.model");
const User = require("../models/user.model");


const followUser = async (req, res) => {
  try {
    const { followingId } = req.body;  
    const followerId = req.user.id;    

    if (followingId === followerId) {
      return res.status(400).json({ message: "You cannot follow yourself!" });
    }

    
    const existingFollow = await Follow.findOne({ followerId, followingId });
    
    if (existingFollow) {
      
      await Follow.deleteOne({ _id: existingFollow._id });

      
      await User.findByIdAndUpdate(followerId, { 
        $inc: { followingCount: -1 }, 
        $pull: { following: followingId }  
      });

      await User.findByIdAndUpdate(followingId, { 
        $inc: { followersCount: -1 }, 
        $pull: { followers: followerId }  
      });

      return res.status(200).json({ message: "Unfollowed successfully", isFollowing: false });
    } else {
      // Follow user
      const newFollow = new Follow({ followerId, followingId });
      await newFollow.save();

      await User.findByIdAndUpdate(followerId, { 
        $inc: { followingCount: 1 }, 
        $push: { following: followingId }  
      });

      await User.findByIdAndUpdate(followingId, { 
        $inc: { followersCount: 1 }, 
        $push: { followers: followerId }  
      });

      return res.status(200).json({ success: true, message: "Followed successfully", isFollowing: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fectchFollower=async (req,res)=>{
    try {
        const userId=req.user.id
        const showFollower=await Follow.find({followerId:userId})
        return res.status(201).json({
            success:true,
            message:'follower',
            showFollower

        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const fetchFollowing = async (req, res) => {
  try {
      const userId = req.user.id;

      
      const followers = await Follow.find({ followingId: userId })
          .populate("followerId", "name avatar"); 

      return res.status(200).json({
          success: true,
          message: "List of followers",
          followers: followers.map(f => ({
              id: f.followerId._id,
              name: f.followerId.name,
              avatar: f.followerId.avatar
          }))
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};





module.exports = { followUser,fectchFollower,fetchFollowing };
