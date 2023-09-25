// Se implementa el enrutador de Express
const { body, validationResult } = require("express-validator");
const { Router } = require("express");
const router = Router();
const {
  actualizarPost,
  crearPost,
  eliminarPost,
  obtenerPosts,
  obtenerPost,
} = require("../controllers/post.controllers");

// ==================================================
//         Rutas para renderizar vistas
// ==================================================

router.get("/", (req, res) => {
  res.render("home");
});

// Ruta para devolver la vista admin
router.get("/admin", (req, res) => {
  res.render("admin");
});

// Ruta para devolver la vista editar
router.get("/admin/:id", (req, res) => {
  res.render("editar", { id: req.params.id });
});

// Ruta para devolver la vista eliminar
router.get("/eliminar/:id", (req, res) => {
  res.render("eliminar", { id: req.params.id });
});

// ==================================================
//         Rutas para CRUD de Publicaciones
// ==================================================

// Crear nueva publicación
router.post("/post", crearPost);

// Obtener todas las publicaciones
router.get("/posts", obtenerPosts);

// Obtener una publicación
router.get("/post/:id", obtenerPost);

// Actualizar una publicación
router.put("/post/:id", actualizarPost);

// Eliminar una publicación
router.delete("/post/:id", eliminarPost);

module.exports = router;
