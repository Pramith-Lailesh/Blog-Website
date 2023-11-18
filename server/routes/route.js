import express from "express";
import { loginUser, signupUser } from "../controller/controller.js";
import {
  uploadImage,
  getImage,
  UpdateFile,
} from "../controller/image-controller.js";

import upload from "../utils/upload.js";
import {
  DeletePost,
  createPost,
  getAllPosts,
  getPost,
} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import {
  deleteComment,
  getComment,
  newComment,
} from "../controller/comment-controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
router.post("/create", authenticateToken, createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.put("/update/:id", UpdateFile);
router.delete("/delete/:id", DeletePost);
router.post("/comments/new", newComment);
router.get("/comments/:id", getComment);
router.delete("/comment/delete/:id", deleteComment);

export default router;
