const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorozationHeader = req.headers["authorization"];
  if (!authorozationHeader)
    return res.status(401).json({ message: "401 Unauthorized" });

  const token = authorozationHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "401 Unauthorized" });

  jwt.verify(token, "3812932sjad34&*@", (err, data) => {
    if (err) return res.status(403).json({ message: "403 Forbidden" });
    req.user = data;
    next();
  });
};
module.exports = { verifyToken };
