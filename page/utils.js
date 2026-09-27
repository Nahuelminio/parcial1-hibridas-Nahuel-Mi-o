import { categorias } from "../data/categorias.js";

// Escapa los datos antes de meterlos en el HTML.
// Sin esto, un producto llamado <script>...</script> ejecutaria ese codigo en la pagina (XSS)
export function escape(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function createPage(title, content) {
  // data-bs-theme="dark" activa el modo oscuro de Bootstrap en toda la pagina
  let html = "";
  html +=
    "<!DOCTYPE html><html lang='es' data-bs-theme='dark'><head><meta charset='UTF-8'>";
  html += `<meta name="viewport" content="width=device-width, initial-scale=1">`;
  html += `<title>${escape(title)}</title>`;
  html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">`;
  html += `<link href="/css/estilos.css" rel="stylesheet">`;
  html += `</head><body class="d-flex flex-column min-vh-100">`;

  html += `
    <nav class="navbar navbar-expand-md border-bottom border-secondary-subtle sticky-top bg-body">
        <div class="container">
            <a class="navbar-brand py-0" href="/">
                <img src="/img/logo/orven-logo.png" alt="ORVEN" height="40">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="/">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="/productos">Productos</a></li>
                    <li class="nav-item"><a class="nav-link" href="/marcas">Marcas</a></li>
                </ul>
            </div>
        </div>
    </nav>`;

  html += `<main class="container py-4 flex-grow-1"><h1 class="h2 mb-4">${escape(title)}</h1>`;
  html += content;
  html += `</main>`;

  html += `
    <footer class="border-top border-secondary-subtle py-3 mt-4">
        <div class="container text-body-secondary small">ORVEN · Aplicaciones Híbridas 2026</div>
    </footer>`;

  html += `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script></body></html>`;
  return html;
}

export function formatPrice(price) {
  return Number(price).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export function createList(lista) {
  let html = `
    <nav class="mb-4">
        <a class="btn btn-primary" href="/productos" >Todos</a>`;

  categorias.forEach(
    (categoria) =>
      (html += `
        <a class="btn btn-outline-secondary" href="/productos/categoria/${escape(categoria.slug)}" >${escape(categoria.name)}</a>`),
  );

  html += `
        <a class="btn btn-success float-end" href="/productos/nuevo" >Nuevo producto</a>
    </nav>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">`;

  lista.forEach(
    (producto) =>
      (html += `
        <div class="col">
            <div class="card h-100 shadow-sm">
                <a href="/productos/${escape(producto._id)}">
                    <img src="/img/productos/${escape(producto.img)}" class="card-img-top" alt="${escape(producto.name)}" style="aspect-ratio: 1 / 1; object-fit: cover;">
                </a>
                <div class="card-body d-flex flex-column">
                    <span class="badge text-bg-secondary text-uppercase align-self-start mb-2">${escape(producto.category)}</span>
                    <h5 class="card-title">${escape(producto.name)}</h5>
                    <p class="card-text text-body-secondary small">${escape(producto.description)}</p>
                    <p class="fs-4 fw-bold mt-auto mb-3">${formatPrice(producto.price)}</p>
                    <a class="btn btn-light w-100 mb-2" href="/productos/${escape(producto._id)}">Ver detalle</a>
                    <div class="d-flex gap-2">
                        <a class="btn btn-outline-primary w-50" href="/productos/editar/${escape(producto._id)}">Editar</a>
                        <a class="btn btn-outline-danger w-50" href="/productos/eliminar/${escape(producto._id)}">Eliminar</a>
                    </div>
                </div>
            </div>
        </div>`),
  );

  html += `</div>`;
  return html;
}

export function createDetail(producto, marca = null) {
  const categoria = categorias.find((c) => c.slug === producto.category);

  return `
    <div class="mx-auto" style="max-width: 760px;">
        <nav class="mb-3" style="--bs-breadcrumb-divider: '›';">
            <ol class="breadcrumb mb-0 small">
                <li class="breadcrumb-item"><a href="/productos">Productos</a></li>
                <li class="breadcrumb-item"><a href="/productos/categoria/${escape(producto.category)}">${escape(categoria ? categoria.name : producto.category)}</a></li>
                <li class="breadcrumb-item active">${escape(producto.name)}</li>
            </ol>
        </nav>

        <div class="card shadow-sm">
            <div class="row g-0 align-items-center">
                <div class="col-sm-5">
                    <img src="/img/productos/${escape(producto.img)}" class="w-100 rounded-start" alt="${escape(producto.name)}" style="aspect-ratio: 1 / 1; object-fit: cover;">
                </div>

                <div class="col-sm-7">
                    <div class="card-body p-4">
                        <span class="badge text-bg-secondary text-uppercase mb-2">${escape(producto.category)}</span>
                        <p class="fs-3 fw-bold mb-2">${formatPrice(producto.price)}</p>
                        <p class="text-body-secondary small mb-3">${escape(producto.description)}</p>

                        <p class="small mb-3"><strong>Marca:</strong> ${marca ? `<a href="/marcas/${escape(marca._id)}">${escape(marca.name)}</a>` : "Sin marca"}</p>

                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <a class="btn btn-light" href="${escape(producto.link)}" target="_blank" rel="noopener">Ver en la web</a>
                            <a class="btn btn-outline-secondary" href="/productos">Volver</a>
                        </div>

                        <div class="d-flex gap-2">
                            <a class="btn btn-sm btn-outline-primary" href="/productos/editar/${escape(producto._id)}">Editar</a>
                            <a class="btn btn-sm btn-outline-danger" href="/productos/eliminar/${escape(producto._id)}">Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

export function createMarcasList(marcas) {
  let html = `
    <nav class="mb-4">
        <a class="btn btn-light" href="/productos">Ver productos</a>
        <a class="btn btn-success float-end" href="/marcas/nuevo">Nueva marca</a>
    </nav>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">`;

  marcas.forEach(
    (marca) =>
      (html += `
        <div class="col">
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                    <h5 class="card-title">${escape(marca.name)}</h5>
                    <p class="card-text text-body-secondary small">${escape(marca.description)}</p>
                    <a class="btn btn-light w-100" href="/marcas/${escape(marca._id)}">Ver relojes</a>
                </div>
            </div>
        </div>`),
  );

  html += `</div>`;
  return html;
}

export function createMarcaDetail(marca, productos) {
  let html = `
    <div class="mb-4">
        <p class="mb-2">${escape(marca.description)}</p>
        <a class="btn btn-sm btn-secondary" href="/marcas">Volver a marcas</a>
    </div>`;

  if (productos.length === 0) {
    html += `<div class="alert alert-info">Esta marca todavía no tiene relojes cargados.</div>`;
    return html;
  }

  html += createList(productos);
  return html;
}

export function createMarcaForm(action, marca = {}, errores = []) {
  let html = createErrores(errores);

  html += `<form action="${escape(action)}" method="POST" style="max-width: 720px;">
        <div class="mt-2">
            <label class="form-label">Nombre:</label>
            <input class="form-control" type="text" name="name" value="${escape(marca.name)}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Foto (URL o nombre del archivo):</label>
            <input class="form-control" type="text" name="photo" value="${escape(marca.photo)}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Descripción:</label>
            <textarea class="form-control" name="description" rows="3" required>${escape(marca.description)}</textarea>
        </div>
        <button class="btn btn-primary mt-3" type="submit">Guardar</button>
        <a class="btn btn-secondary mt-3" href="/marcas">Volver</a>
    </form>`;

  return html;
}

export function createMarcaDeleteForm(marca) {
  return `
    <div class="card mb-3" style="max-width: 480px;">
        <div class="card-body">
            <h5 class="card-title">${escape(marca.name)}</h5>
            <p class="card-text">${escape(marca.description)}</p>
            <p class="card-text">¿Seguro que querés eliminar esta marca?</p>
            <form action="/marcas/eliminar/${escape(marca._id)}" method="POST">
                <button class="btn btn-danger" type="submit">Eliminar</button>
                <a class="btn btn-secondary" href="/marcas">Volver</a>
            </form>
        </div>
    </div>`;
}

export function createErrores(errores) {
  if (errores.length === 0) return "";

  let html = `<div class="alert alert-danger"><ul class="mb-0">`;
  errores.forEach((error) => (html += `<li>${escape(error)}</li>`));
  html += `</ul></div>`;
  return html;
}

export function createHome(categorias) {
  let html = `<p class="lead">Elegí una categoría para ver los relojes.</p>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">`;

  categorias.forEach(
    (categoria) =>
      (html += `
        <div class="col">
            <a class="card h-100 text-decoration-none text-body shadow-sm" href="/productos/categoria/${escape(categoria.slug)}">
                <div class="card-body">
                    <h5 class="card-title">${escape(categoria.name)}</h5>
                    <p class="card-text text-body-secondary">Ver relojes de esta categoría</p>
                </div>
            </a>
        </div>`),
  );

  html += `</div>
    <a class="btn btn-light mt-4" href="/productos">Ver todos los productos</a>
    <a class="btn btn-outline-dark mt-4" href="/marcas">Ver marcas</a>`;
  return html;
}

export function createForm(action, producto = {}, errores = [], marcas = []) {
  let html = createErrores(errores);

  html += `<form action="${escape(action)}" method="POST" style="max-width: 720px;">
        <div class="mt-2">
            <label class="form-label">Nombre:</label>
            <input class="form-control" type="text" name="name" value="${escape(producto.name)}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Descripción:</label>
            <textarea class="form-control" name="description" rows="3" required>${escape(producto.description)}</textarea>
        </div>
        <div class="mt-2">
            <label class="form-label">Precio:</label>
            <input class="form-control" type="number" name="price" min="0" value="${escape(producto.price)}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Link:</label>
            <input class="form-control" type="text" name="link" value="${escape(producto.link)}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Imagen (nombre del archivo en /img/productos):</label>
            <input class="form-control" type="text" name="img" value="${escape(producto.img)}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Categoría:</label>
            <select class="form-select" name="category" required>
                <option value="">Elegir categoría</option>`;

  categorias.forEach(
    (categoria) =>
      (html += `
                <option value="${escape(categoria.slug)}" ${producto.category === categoria.slug ? "selected" : ""}>${escape(categoria.name)}</option>`),
  );

  html += `
            </select>
        </div>
        <div class="mt-2">
            <label class="form-label">Marca:</label>
            <select class="form-select" name="brandId">
                <option value="">Sin marca</option>`;

  marcas.forEach(
    (marca) =>
      (html += `
                <option value="${escape(marca._id)}" ${String(producto.brandId) === String(marca._id) ? "selected" : ""}>${escape(marca.name)}</option>`),
  );

  html += `
            </select>
        </div>
        <button class="btn btn-primary mt-3" type="submit">Guardar</button>
        <a class="btn btn-secondary mt-3" href="/productos">Volver</a>
    </form>`;

  return html;
}

export function createDeleteForm(producto) {
  return `
    <div class="card mb-3" style="max-width: 480px;">
        <img src="/img/productos/${escape(producto.img)}" class="card-img-top" alt="${escape(producto.name)}">
        <div class="card-body">
            <h5 class="card-title">${escape(producto.name)}</h5>
            <p class="card-text">${formatPrice(producto.price)} - ${escape(producto.category)}</p>
            <p class="card-text">¿Seguro que querés eliminar este producto?</p>
            <form action="/productos/eliminar/${escape(producto._id)}" method="POST">
                <button class="btn btn-danger" type="submit">Eliminar</button>
                <a class="btn btn-secondary" href="/productos">Volver</a>
            </form>
        </div>
    </div>`;
}

export default {
  escape,
  createPage,
  createHome,
  createList,
  createDetail,
  createForm,
  createDeleteForm,
};
