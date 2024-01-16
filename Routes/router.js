const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/userController");
const upload=require("../multerconfig/storageconfig")

// routes
router.post(
  "/user/register", //we'll check if this works with postman 
  upload.single("user_profile"),
  controllers.userpost,
); //"user_profile" is same name from frontend

module.exports = router;
