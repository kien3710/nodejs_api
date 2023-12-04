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
const skillController = require("../controller/skill.controller");

router.get("/", skillController.getAll);
router.get("/:id", skillController.getById);
router.post("/", upload.single("image"), skillController.create);
router.put("/:id", upload.single("image"), skillController.update);
router.delete("/:id", skillController.delete);

module.exports = router;
