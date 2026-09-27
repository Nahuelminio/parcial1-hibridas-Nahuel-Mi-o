import * as productosService from "../services/productos.services.js";
import * as marcasService from "../services/marcas.services.js";
import * as productosView from "../views/productos.views.js";
import { categorias, existeCategoria } from "../data/categorias.js";

export async function home(req, res) {
  res.send(productosView.createHomePage());
}

export async function getProductos(req, res) {
  try {
    const filtros = req.query;
    const productos = await productosService.getProductos(filtros);
    res.send(productosView.createProductosPage(productos));
  } catch (error) {
    res
      .status(500)
      .send(
        productosView.pageError("Error", "No se pudieron cargar los productos"),
      );
  }
}

export async function getProductosByCategoria(req, res) {
  try {
    const slug = req.params.slug;

    if (!existeCategoria(slug)) {
      return res
        .status(404)
        .send(productosView.pageError("404", "La categoría no existe"));
    }

    const categoria = categorias.find((categoria) => categoria.slug === slug);
    const productos = await productosService.getProductos({ category: slug });
    res.send(productosView.createProductosPage(productos, categoria.name));
  } catch (error) {
    res
      .status(500)
      .send(
        productosView.pageError("Error", "No se pudieron cargar los productos"),
      );
  }
}

export async function getProductoById(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.getProductoById(id);

    if (producto) {
      const marca = await marcasService.getMarcaById(producto.brandId);
      res.send(productosView.createDetailPage(producto, marca));
    } else {
      res
        .status(404)
        .send(productosView.pageError("404", "Producto no encontrado"));
    }
  } catch (error) {
    res
      .status(500)
      .send(productosView.pageError("Error", "No se pudo cargar el producto"));
  }
}

export async function nuevoProductoForm(req, res) {
  const marcas = await marcasService.getMarcas();
  res.send(productosView.nuevoProductoForm({}, [], marcas));
}

export async function guardarProducto(req, res) {
  try {
    const { producto, errores } = productosService.validarProducto(req.body);

    if (errores.length > 0) {
      const marcas = await marcasService.getMarcas();
      return res
        .status(400)
        .send(productosView.nuevoProductoForm(req.body, errores, marcas));
    }

    const guardado = await productosService.guardarProducto(producto);
    res.redirect(`/productos/${guardado._id}`);
  } catch (error) {
    res
      .status(500)
      .send(productosView.pageError("Error", "No se pudo guardar el producto"));
  }
}

export async function editarProductoForm(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.getProductoById(id);

    if (producto) {
      const marcas = await marcasService.getMarcas();
      res.send(productosView.editarProductoForm(producto, [], marcas));
    } else {
      res
        .status(404)
        .send(productosView.pageError("404", "Producto no encontrado"));
    }
  } catch (error) {
    res
      .status(500)
      .send(productosView.pageError("Error", "No se pudo cargar el producto"));
  }
}

export async function editarProducto(req, res) {
  try {
    const id = req.params.id;
    const { producto, errores } = productosService.validarProducto(req.body);

    if (errores.length > 0) {
      const marcas = await marcasService.getMarcas();
      return res
        .status(400)
        .send(
          productosView.editarProductoForm(
            { _id: id, ...req.body },
            errores,
            marcas,
          ),
        );
    }

    const editado = await productosService.editarProducto(id, producto);

    if (editado) {
      res.redirect(`/productos/${id}`);
    } else {
      res
        .status(404)
        .send(productosView.pageError("404", "Producto no encontrado"));
    }
  } catch (error) {
    res
      .status(500)
      .send(productosView.pageError("Error", "No se pudo editar el producto"));
  }
}

export async function eliminarProductoForm(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.getProductoById(id);

    if (producto) {
      res.send(productosView.eliminarProductoForm(producto));
    } else {
      res
        .status(404)
        .send(productosView.pageError("404", "Producto no encontrado"));
    }
  } catch (error) {
    res
      .status(500)
      .send(productosView.pageError("Error", "No se pudo cargar el producto"));
  }
}

export async function eliminarProducto(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.eliminarProducto(id);

    if (producto) {
      res.redirect("/productos");
    } else {
      res
        .status(404)
        .send(productosView.pageError("404", "Producto no encontrado"));
    }
  } catch (error) {
    res
      .status(500)
      .send(
        productosView.pageError("Error", "No se pudo eliminar el producto"),
      );
  }
}
