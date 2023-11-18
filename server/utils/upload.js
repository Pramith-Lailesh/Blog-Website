// import { GridFsStorage } from "multer-gridfs-storage";
// import multer from "multer";

// const storage = new GridFsStorage({
//   url: `mongodb+srv://pramithlailesh999:8549905475@cluster0.p4c9vbf.mongodb.net/?retryWrites=true&w=majority
//   `,

//   file: (req, file) => {
//     const match = ["image/png", "image/jpg"];
//     if (match.indexOf(file.mimetype) === -1) {
//       return `${Date.now()}_blog_${file.originalname}`;
//     }
//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}_blog_${file.originalname}`,
//     };
//   },
// });

// const upload = multer({ storage });
// export default upload;

import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
export default upload;
