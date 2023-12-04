const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});
const postsController = require("../controller/posts.controller");

router.get("/", postsController.getAll);
router.get("/:id", postsController.getById);
router.post("/", upload.single("image"), postsController.create);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.delete);

module.exports = router;
