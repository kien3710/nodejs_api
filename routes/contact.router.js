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
const contactController = require("../controller/contact.controller");

router.get("/", contactController.getAll);
router.get("/:id", contactController.getById);
router.post("/", contactController.create);
router.put("/:id", contactController.update);
router.delete("/:id", contactController.delete);

module.exports = router;
