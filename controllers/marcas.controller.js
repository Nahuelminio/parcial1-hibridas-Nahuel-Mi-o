import * as marcasService from "../services/marcas.services.js";
import * as productosService from "../services/productos.services.js";
import * as marcasView from "../views/marcas.views.js";

export async function getMarcas(req, res) {
  try {
    const marcas = await marcasService.getMarcas();
    res.send(marcasView.createMarcasPage(marcas));
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudieron cargar las marcas"));
  }
}

export async function getMarcaById(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.getMarcaById(id);

    if (!marca) {
      return res
        .status(404)
        .send(marcasView.pageError("404", "Marca no encontrada"));
    }

    const productos = await productosService.getProductosByMarca(id);
    res.send(marcasView.createMarcaDetailPage(marca, productos));
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudo cargar la marca"));
  }
}

export async function nuevaMarcaForm(req, res) {
  res.send(marcasView.nuevaMarcaForm());
}

export async function guardarMarca(req, res) {
  try {
    const { marca, errores } = marcasService.validarMarca(req.body);

    if (errores.length > 0) {
      return res.status(400).send(marcasView.nuevaMarcaForm(req.body, errores));
    }

    const guardada = await marcasService.guardarMarca(marca);
    res.redirect(`/marcas/${guardada._id}`);
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudo guardar la marca"));
  }
}

export async function editarMarcaForm(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.getMarcaById(id);

    if (marca) {
      res.send(marcasView.editarMarcaForm(marca));
    } else {
      res.status(404).send(marcasView.pageError("404", "Marca no encontrada"));
    }
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudo cargar la marca"));
  }
}

export async function editarMarca(req, res) {
  try {
    const id = req.params.id;
    const { marca, errores } = marcasService.validarMarca(req.body);

    if (errores.length > 0) {
      return res
        .status(400)
        .send(marcasView.editarMarcaForm({ _id: id, ...req.body }, errores));
    }

    const editada = await marcasService.editarMarca(id, marca);

    if (editada) {
      res.redirect(`/marcas/${id}`);
    } else {
      res.status(404).send(marcasView.pageError("404", "Marca no encontrada"));
    }
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudo editar la marca"));
  }
}

export async function eliminarMarcaForm(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.getMarcaById(id);

    if (marca) {
      res.send(marcasView.eliminarMarcaForm(marca));
    } else {
      res.status(404).send(marcasView.pageError("404", "Marca no encontrada"));
    }
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudo cargar la marca"));
  }
}

export async function eliminarMarca(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.eliminarMarca(id);

    if (marca) {
      res.redirect("/marcas");
    } else {
      res.status(404).send(marcasView.pageError("404", "Marca no encontrada"));
    }
  } catch (error) {
    res
      .status(500)
      .send(marcasView.pageError("Error", "No se pudo eliminar la marca"));
  }
}
