const jwt = require("jsonwebtoken");

// request header must contain a valid token
const listAuthen = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "Token is null. Please login again." });
  }
  try {
    const decode = await jwt.verify(token, process.env.TOKEN_KEY);
    req.user = { user_id: decode.user_id };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "Token is invalid or expired. Please login again." });
  }
};

module.exports = listAuthen;
