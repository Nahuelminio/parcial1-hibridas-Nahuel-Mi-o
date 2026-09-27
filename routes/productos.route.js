import * as productosController from "../controllers/productos.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", productosController.home);
router.get("/productos", productosController.getProductos);

router.get("/productos/nuevo", productosController.nuevoProductoForm);
router.post("/productos/nuevo", productosController.guardarProducto);
router.get("/productos/editar/:id", productosController.editarProductoForm);
router.post("/productos/editar/:id", productosController.editarProducto);
router.get("/productos/eliminar/:id", productosController.eliminarProductoForm);
router.post("/productos/eliminar/:id", productosController.eliminarProducto);
router.get(
  "/productos/categoria/:slug",
  productosController.getProductosByCategoria,
);

router.get("/productos/:id", productosController.getProductoById);

export default router;
