import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  imageUrl: String,
});

const ImageUpload = mongoose.model("ImageUpload", uploadSchema);
export default ImageUpload;
