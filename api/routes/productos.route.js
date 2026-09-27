import { Router } from "express";
import * as productosController from "../controllers/productos.controller.js";

const router = Router();

router.get("/api/productos", productosController.getProductos);
router.get("/api/productos/:id", productosController.getProductoById);
router.post("/api/productos", productosController.saveProducto);
router.put("/api/productos/:id", productosController.replaceProducto);
router.patch("/api/productos/:id", productosController.updateProducto);
router.delete("/api/productos/:id", productosController.deleteProducto);

export default router;
