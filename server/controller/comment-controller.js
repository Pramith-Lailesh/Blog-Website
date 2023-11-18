import Comment from "../model/comments.js";

export const newComment = async (req, res) => {
  try {
    const body = req.body;

    const comment = await Comment.create(body);
    res.status(200).json({ msg: "comment saved successfully", comment });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "error in creating comments", error: error.message });
  }
};

export const getComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.find({ postId: id });
    res.status(200).json({ msg: "comment fetched successfully", comment });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error in fetching comments", error: error.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await Comment.findByIdAndDelete(id);
    if (comment) {
      res.status(200).json({ msg: "comment deleted successfully" });
    } else {
      res.status(404).json({ msg: "comment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error in deleting comments", error: error.message });
  }
};
