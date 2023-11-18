import ImageUpload from "../model/imageUpload.js";
import Post from "../model/post.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        msg: "File not found",
      });
    }
    const upload = await ImageUpload.create({ imageUrl: req.file.filename });

    res.status(200).json({ status: "img uploaded", url: upload.imageUrl });
  } catch (error) {
    console.error(`error in reading file`, error);

    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

export const getImage = async (req, res) => {
  try {
    const receive = await ImageUpload.find({
      imageUrl: req.params.filename,
    });

    res.status(200).json(receive);
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

// export const UpdateFile = async (req, res) => {
//   try {
//     let postId = req.params.id;

//     const post = await Post.findById({ _id: postId });

//     const image = await ImageUpload.find({ imageUrl: post.picture });
//     console.log(image[0]);
//     console.log(req.body.picture);
//     if (!image) {
//       return res.status(404).json({ msg: "post not found" });
//     }
//     const upload = await ImageUpload.findByIdAndUpdate(
//       image[0]._id,
//       req.body.picture,
//       {
//         new: true,
//       }
//     );

//     const updatePost = await Post.findByIdAndUpdate(post._id, req.body, {
//       new: true,
//     });
//     res.status(200).json({ status: "img uploaded", url: upload.imageUrl });
//   } catch (error) {
//     console.error(`error in reading file`, error);

//     res.status(500).json({
//       msg: "Server error",
//       error: error.message,
//     });
//   }
// };
export const UpdateFile = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    let image = await ImageUpload.findOne({ imageUrl: post.picture });

    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    if (req.body.picture) {
      image = await ImageUpload.findByIdAndUpdate(
        image._id,
        { imageUrl: req.body.picture },
        { new: true }
      );
    }

    const updatePost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "Post and image updated successfully",
      post: updatePost,
      image: image,
    });
  } catch (error) {
    console.error("Error in updating post and image:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
