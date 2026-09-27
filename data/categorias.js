export const categorias = [
  { name: "Deportivos", slug: "deportivos" },
  { name: "Clásicos", slug: "clasicos" },
  { name: "Digitales", slug: "digitales" },
  { name: "Automáticos", slug: "automaticos" },
  { name: "Cronógrafos", slug: "cronografos" },
];

export function existeCategoria(slug) {
  return categorias.some((categoria) => categoria.slug === slug);
}

export default categorias;
