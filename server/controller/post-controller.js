import ImageUpload from "../model/imageUpload.js";
import Post from "../model/post.js";

export const createPost = async (req, res) => {
  const { title, description, picture, username, categories, createdDate } =
    req.body;
  try {
    const post = await Post.create({
      title,
      description,
      picture,
      username,
      categories,
      createdDate,
    });
    return res.status(200).json({ msg: "Posted successfully", post });
  } catch (error) {
    res.status(500).json({ msg: "Error while posting", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let category = req.query.category;
    let posts;
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }

    res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error while posting", error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    let postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const DeletePost = async (req, res) => {
  try {
    let id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json("successfully deleted");
  } catch (error) {
    res.status(500).json({ msg: "error while deleting", error: error.message });
  }
};
