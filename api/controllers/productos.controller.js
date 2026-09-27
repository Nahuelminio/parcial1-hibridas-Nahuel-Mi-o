import * as productosService from "../../services/productos.services.js";

export async function getProductos(req, res) {
  try {
    const filtros = req.query;
    const productos = await productosService.getProductos(filtros);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductoById(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.getProductoById(id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function saveProducto(req, res) {
  try {
    const { producto, errores } = productosService.validarProducto(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ message: "Datos invalidos", errores });
    }

    const guardado = await productosService.guardarProducto(producto);
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function replaceProducto(req, res) {
  try {
    const id = req.params.id;
    const { producto, errores } = productosService.validarProducto(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ message: "Datos invalidos", errores });
    }

    const editado = await productosService.editarProducto(id, producto);

    if (editado) {
      res.status(200).json(editado);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PATCH: cambia solo los campos que llegan y deja los demas como estaban
export async function updateProducto(req, res) {
  try {
    const id = req.params.id;
    const productoActual = await productosService.getProductoById(id);

    if (!productoActual) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const { producto, errores } = productosService.validarProducto({
      name: req.body.name ?? productoActual.name,
      description: req.body.description ?? productoActual.description,
      price: req.body.price ?? productoActual.price,
      link: req.body.link ?? productoActual.link,
      img: req.body.img ?? productoActual.img,
      category: req.body.category ?? productoActual.category,
      brandId: req.body.brandId ?? productoActual.brandId,
    });

    if (errores.length > 0) {
      return res.status(400).json({ message: "Datos invalidos", errores });
    }

    const editado = await productosService.editarProducto(id, producto);
    res.status(200).json(editado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProducto(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.eliminarProducto(id);

    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
