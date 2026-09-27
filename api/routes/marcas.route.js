import { Router } from "express";
import * as marcasController from "../controllers/marcas.controller.js";

const router = Router();

router.get("/api/marcas", marcasController.getMarcas);
router.get("/api/marcas/:id", marcasController.getMarcaById);
router.get("/api/marcas/:id/productos", marcasController.getProductosByMarca);
router.post("/api/marcas", marcasController.saveMarca);
router.put("/api/marcas/:id", marcasController.replaceMarca);
router.patch("/api/marcas/:id", marcasController.updateMarca);
router.delete("/api/marcas/:id", marcasController.deleteMarca);

export default router;
