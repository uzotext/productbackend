const express = require("express");
const { registerUser, loginUser, updateUser, getAllUsers, getUsertById, deleteUser } = require("../controller/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUsertById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;