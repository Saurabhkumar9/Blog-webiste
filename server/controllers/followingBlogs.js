const Blog = require("../models/Blog.model");
const User = require("../models/user.model");

const followingUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    const user = await User.findById(userId).populate("following", "_id");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const followingIds = user.following.map((user) => user._id);

    const blogs = await Blog.find({ userId: { $in: followingIds } })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });

    res.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching following blogs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { followingUserBlogs };

