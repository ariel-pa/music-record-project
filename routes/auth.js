const express = require("express");
const router =express.Router();
const {createUser, loginUser} = require("../controllers/auth");
const {validatorRegister, validatorLogin} = require("../validators/auth");

/**
 * Ruta para auth.js
 */
//TODO: http://localhost:3001/api/auth/login
//TODO: http://localhost:3001/api/auth/registrar

router.post("/register", validatorRegister, createUser);


router.post("/login", validatorLogin, loginUser);

module.exports = router