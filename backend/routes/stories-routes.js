const express = require("express");
//const usersControllers = require("../controllers/users-controllers");

// luodaan tänne reititys users resurssille
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "GET request in stories" });
});
// esimerkkinä login-endpoint
//router.post('/api/users/login/', usersControllers.login);

module.exports = router;
