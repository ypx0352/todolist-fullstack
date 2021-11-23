const jwt = require("jsonwebtoken");
const login = (req, res) => {
  const { user_id, name } = req.user;
  const { rememberMe } = req.body;

  // set token expiry time according to remember me status
  var expiredTime = 30 * 60;
  if (rememberMe) {
    expiredTime = 24 * 60 * 60;
  }

  try {
    const token = jwt.sign({ user_id: user_id }, process.env.TOKEN_KEY, {
      expiresIn: expiredTime,
    });
    res
      .status(200)
      .json({ success: true, result: { token: token, name: name } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error." });
  }
};

module.exports = login;
