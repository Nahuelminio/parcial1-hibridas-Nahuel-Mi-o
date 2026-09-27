import express from "express";
import productosRoute from "./routes/productos.route.js";
import marcasRoute from "./routes/marcas.route.js";
import productosApiRoute from "./api/routes/productos.route.js";
import marcasApiRoute from "./api/routes/marcas.route.js";

const app = express();

app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(productosRoute);
app.use(marcasRoute);
app.use(productosApiRoute);
app.use(marcasApiRoute);

app.listen(3333, () => console.log("Levantado en http://localhost:3333"));
