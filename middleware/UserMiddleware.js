const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(400).json({ msg: "You are not authorized" });
    } else {
     jwt.verify(token, process.env.JWT_TOKEN,(err,VerifyToken)=>{
      if(err){
                res.status(400).json({ msg: "You are not authorized" });

      }
      else{
        req.body.userId = VerifyToken.id;
          next();
      }
     });
      // if (!VerifyToken) {
      //   res.status(400).json({ msg: "You are not authorized" });
      // } else {
      //   req.body.userId = VerifyToken.id;
      //   console.log(VerifyToken.id);
      //   next();
      // }
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong ." });
  }
};

module.exports = userMiddleware;
