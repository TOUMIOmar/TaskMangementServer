const express = require("express");
const router = express.Router();
const { Registre, Login,UserData } = require("../controllers/UserControllers");
const userMiddleware=require('../middleware/UserMiddleware')
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "Not a valide email").isEmail().normalizeEmail(),
    check("password", "Your password should containt ...").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }),
  ],
  Registre
);
router.post("/login", Login);
router.get('/getdata',userMiddleware,UserData)
module.exports = router;
