import * as marcasController from "../controllers/marcas.controller.js";
import { Router } from "express";

const router = Router();

router.get("/marcas", marcasController.getMarcas);

router.get("/marcas/nuevo", marcasController.nuevaMarcaForm);
router.post("/marcas/nuevo", marcasController.guardarMarca);
router.get("/marcas/editar/:id", marcasController.editarMarcaForm);
router.post("/marcas/editar/:id", marcasController.editarMarca);
router.get("/marcas/eliminar/:id", marcasController.eliminarMarcaForm);
router.post("/marcas/eliminar/:id", marcasController.eliminarMarca);

router.get("/marcas/:id", marcasController.getMarcaById);

export default router;
