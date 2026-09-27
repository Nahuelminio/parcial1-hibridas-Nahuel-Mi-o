import * as marcasService from "../../services/marcas.services.js";
import * as productosService from "../../services/productos.services.js";

export async function getMarcas(req, res) {
  try {
    const marcas = await marcasService.getMarcas();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMarcaById(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.getMarcaById(id);

    if (marca) {
      res.status(200).json(marca);
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductosByMarca(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.getMarcaById(id);

    if (!marca) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    const productos = await productosService.getProductosByMarca(id);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function saveMarca(req, res) {
  try {
    const { marca, errores } = marcasService.validarMarca(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ message: "Datos invalidos", errores });
    }

    const guardada = await marcasService.guardarMarca(marca);
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function replaceMarca(req, res) {
  try {
    const id = req.params.id;
    const { marca, errores } = marcasService.validarMarca(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ message: "Datos invalidos", errores });
    }

    const editada = await marcasService.editarMarca(id, marca);

    if (editada) {
      res.status(200).json(editada);
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PATCH: cambia solo los campos que llegan
export async function updateMarca(req, res) {
  try {
    const id = req.params.id;
    const marcaActual = await marcasService.getMarcaById(id);

    if (!marcaActual) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    const { marca, errores } = marcasService.validarMarca({
      name: req.body.name ?? marcaActual.name,
      photo: req.body.photo ?? marcaActual.photo,
      description: req.body.description ?? marcaActual.description,
    });

    if (errores.length > 0) {
      return res.status(400).json({ message: "Datos invalidos", errores });
    }

    const editada = await marcasService.editarMarca(id, marca);
    res.status(200).json(editada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteMarca(req, res) {
  try {
    const id = req.params.id;
    const marca = await marcasService.eliminarMarca(id);

    if (marca) {
      res.status(200).json(marca);
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
