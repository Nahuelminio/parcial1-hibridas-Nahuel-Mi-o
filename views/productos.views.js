import {
  createPage,
  createHome,
  createList,
  createDetail,
  createForm,
  createDeleteForm,
} from "../page/utils.js";
import { categorias } from "../data/categorias.js";

export function createHomePage() {
  return createPage("Relojería", createHome(categorias));
}

export function createProductosPage(productos, titulo = "Productos") {
  return createPage(titulo, createList(productos));
}

export function createDetailPage(producto, marca = null) {
  return createPage(producto.name, createDetail(producto, marca));
}

export function nuevoProductoForm(producto = {}, errores = [], marcas = []) {
  return createPage(
    "Nuevo producto",
    createForm("/productos/nuevo", producto, errores, marcas),
  );
}

export function editarProductoForm(producto, errores = [], marcas = []) {
  return createPage(
    "Editar producto",
    createForm(`/productos/editar/${producto._id}`, producto, errores, marcas),
  );
}

export function eliminarProductoForm(producto) {
  return createPage("Eliminar producto", createDeleteForm(producto));
}

export function pageError(error, mensaje) {
  return createPage(
    error,
    `<p>${mensaje}</p><a class="btn btn-primary" href="/productos">Volver</a>`,
  );
}
