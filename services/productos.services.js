import { MongoClient, ObjectId } from "mongodb";
import { existeCategoria } from "../data/categorias.js";

const MONGO_URI =
  "mongodb+srv://admin:admin@dwm4av.pjkus1n.mongodb.net/?appName=DWM4AV";

const client = new MongoClient(MONGO_URI);
const db = client.db("AH20232CP1");

const productos = db.collection("productos");

export function validarProducto(datos = {}) {
  const producto = {
    name: String(datos.name ?? "").trim(),
    description: String(datos.description ?? "").trim(),
    price: Number(datos.price),
    link: String(datos.link ?? "").trim(),
    img: String(datos.img ?? "").trim(),
    category: String(datos.category ?? "").trim(),
  };

  const errores = [];

  const brandId = datos.brandId ?? "";
  if (brandId) {
    if (ObjectId.isValid(brandId)) {
      producto.brandId = new ObjectId(brandId);
    } else {
      errores.push("La marca no es valida");
    }
  }

  if (!producto.name) errores.push("El nombre es obligatorio");
  if (!producto.description) errores.push("La descripción es obligatoria");
  if (!Number.isFinite(producto.price) || producto.price < 0)
    errores.push("El precio tiene que ser un número mayor o igual a 0");
  if (!producto.link) errores.push("El link es obligatorio");
  if (!producto.img) errores.push("La imagen es obligatoria");
  if (!existeCategoria(producto.category))
    errores.push("La categoría no existe");

  return { producto, errores };
}

export async function getProductos(filtros = {}) {
  const filter = { eliminado: { $ne: true } };

  if (filtros.category) {
    filter.category = filtros.category;
  }

  if (filtros.maxPrice) {
    filter.price = { $lte: Number(filtros.maxPrice) };
  }

  return productos.find(filter).toArray();
}

export async function getProductoById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return productos.findOne({ _id: new ObjectId(id), eliminado: { $ne: true } });
}

export async function getProductosByMarca(brandId) {
  if (!ObjectId.isValid(brandId)) {
    return [];
  }

  return productos
    .find({ brandId: new ObjectId(brandId), eliminado: { $ne: true } })
    .toArray();
}

export async function guardarProducto(producto) {
  const resultado = await productos.insertOne(producto);
  return { _id: resultado.insertedId, ...producto };
}

export async function editarProducto(id, producto) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const resultado = await productos.replaceOne(
    { _id: new ObjectId(id) },
    producto,
  );

  if (resultado.matchedCount === 0) {
    return null;
  }

  return { _id: new ObjectId(id), ...producto };
}

export async function eliminarProducto(id) {
  const producto = await getProductoById(id);

  if (!producto) {
    return null;
  }

  await productos.updateOne(
    { _id: new ObjectId(id) },
    { $set: { eliminado: true } },
  );

  return producto;
}
