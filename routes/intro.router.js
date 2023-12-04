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
const introController = require("../controller/intro.controller");

router.get("/", introController.getAll);
router.get("/:id", introController.getById);
router.post("/", upload.single("image"), introController.create);
router.put("/:id", introController.update);
router.delete("/:id", introController.delete);

module.exports = router;
