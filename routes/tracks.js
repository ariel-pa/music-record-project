const express = require("express");
const router =express.Router();
const {authMiddleware} = require("../middleware/session");
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks");
const {getItems, createItem, getItem, updateItem, deleteItem} = require("../controllers/tracks");
const { checkRol } = require("../middleware/role");

/**
 * Ruta que lista todos los items
 */
router.get("/", authMiddleware, getItems);
/**
 * Ruta para obtener detalle de item
 */
 router.get("/:id",authMiddleware, validatorGetItem, getItem);
/**
 * Ruta para crear un item
 */
router.post("/", authMiddleware,checkRol(["user","admin"]), validatorCreateItem, createItem);
/**
 * Ruta para actualizar un item
 */
 router.put("/:id",authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
 /**
 * Ruta para eliminar un item
 */
  router.delete("/:id",authMiddleware, validatorGetItem, deleteItem);
module.exports = router