import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI =
  "mongodb+srv://admin:admin@dwm4av.pjkus1n.mongodb.net/?appName=DWM4AV";

const client = new MongoClient(MONGO_URI);
const db = client.db("AH20232CP1");

const marcas = db.collection("marcas");

export function validarMarca(datos = {}) {
  const marca = {
    name: String(datos.name ?? "").trim(),
    photo: String(datos.photo ?? "").trim(),
    description: String(datos.description ?? "").trim(),
  };

  const errores = [];

  if (!marca.name) errores.push("El nombre es obligatorio");
  if (!marca.photo) errores.push("La foto es obligatoria");
  if (!marca.description) errores.push("La descripción es obligatoria");

  return { marca, errores };
}

export async function getMarcas() {
  return marcas.find({ eliminado: { $ne: true } }).toArray();
}

export async function getMarcaById(id) {
  if (!id || !ObjectId.isValid(id)) {
    return null;
  }

  return marcas.findOne({ _id: new ObjectId(id), eliminado: { $ne: true } });
}

export async function guardarMarca(marca) {
  const resultado = await marcas.insertOne(marca);
  return { _id: resultado.insertedId, ...marca };
}

export async function editarMarca(id, marca) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const resultado = await marcas.replaceOne({ _id: new ObjectId(id) }, marca);

  if (resultado.matchedCount === 0) {
    return null;
  }

  return { _id: new ObjectId(id), ...marca };
}

export async function eliminarMarca(id) {
  const marca = await getMarcaById(id);

  if (!marca) {
    return null;
  }

  await marcas.updateOne(
    { _id: new ObjectId(id) },
    { $set: { eliminado: true } },
  );

  return marca;
}
