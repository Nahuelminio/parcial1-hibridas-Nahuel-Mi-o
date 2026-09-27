import {
  createPage,
  createMarcasList,
  createMarcaDetail,
  createMarcaForm,
  createMarcaDeleteForm,
} from "../page/utils.js";

export function createMarcasPage(marcas) {
  return createPage("Marcas", createMarcasList(marcas));
}

export function createMarcaDetailPage(marca, productos) {
  return createPage(marca.name, createMarcaDetail(marca, productos));
}

export function nuevaMarcaForm(marca = {}, errores = []) {
  return createPage(
    "Nueva marca",
    createMarcaForm("/marcas/nuevo", marca, errores),
  );
}

export function editarMarcaForm(marca, errores = []) {
  return createPage(
    "Editar marca",
    createMarcaForm(`/marcas/editar/${marca._id}`, marca, errores),
  );
}

export function eliminarMarcaForm(marca) {
  return createPage("Eliminar marca", createMarcaDeleteForm(marca));
}

export function pageError(error, mensaje) {
  return createPage(
    error,
    `<p>${mensaje}</p><a class="btn btn-primary" href="/marcas">Volver</a>`,
  );
}
