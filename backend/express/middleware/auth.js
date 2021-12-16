const jwt = require("jsonwebtoken");
const { models } = require('../../database')
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.cookies.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded.user_id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const isAdmin = (req, res, next) => {
  models.user.findOne({ 
    where: {
        id: req.user,
    } 
  }).then(user => {
    if(user.isAdmin){
      next()
      return
    } else {
      res.status(403).send({
        message: "Require Admin Role!"
      })
      return
    }
  })
};
module.exports = {
  isAdmin,
  verifyToken
};