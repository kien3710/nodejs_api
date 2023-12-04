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
const educationController = require("../controller/education.controller");

router.get("/", educationController.getAll);
router.get("/:id", educationController.getById);
router.post("/", upload.single("image"), educationController.create);
router.put("/:id", educationController.update);
router.delete("/:id", educationController.delete);

module.exports = router;
