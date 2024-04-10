const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token." });
    }

    req.email = decoded.email;
    next();
  });
};

module.exports = { verifyAdminToken };
