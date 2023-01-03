const express =  require("express");
const router  = express.Router();
const {validatorGetItem} = require("../validators/tracks");
const uploadMiddlerware = require("../utils/handleStorage");
const {createItem, getItem, getItems, updateItem, deleteItem} = require("../controllers/storage");
/**
 * Obtener lista de items
 */
router.get("/", getItems);
/**
 * Obtener detalle de un item
 */
router.get("/:id",validatorGetItem, getItem);
/**
 * Crear un item
 */
router.post("/", uploadMiddlerware.single("myfile"), createItem );
/**
 * Actualizar un item
 */
router.put("/:id",validatorGetItem, updateItem);
/**
 * Eliminar un item
 */
router.delete("/:id",validatorGetItem, deleteItem);

module.exports = router;