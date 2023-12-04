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
const infoController = require("../controller/info.controller");

router.get("/", infoController.getAll);
router.get("/:id", infoController.getById);
router.post("/", upload.single("image"), infoController.create);
router.put("/:id", upload.single("image"), infoController.update);
router.delete("/:id", infoController.delete);

module.exports = router;
