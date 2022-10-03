const express = require("express");
const router = express.Router();

const { register, getAllUsers } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/getAll").get(getAllUsers);


module.exports = router;
