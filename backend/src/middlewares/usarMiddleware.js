const jwt = require("jsonwebtoken");
const userMiddleware = (req, res, next) => {
  try {
    let token = req.header("authorization");
    if (token) {
      token = token.split(" ")[1];

      jwt.verify(token, process.env.APP_JWT_SECRET_USER, (error, user) => {
        if (error) return res.sendStatus(403);
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(409);
  }
};
module.exports = userMiddleware;
