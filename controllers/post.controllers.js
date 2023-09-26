const ctrl = {};
const Posts = require("../models/Posts");

// --Se crea una nueva Publicación--

ctrl.crearPost = async (req, res) => {
  try {
    const post = await Posts.create(req.body);
    res.send({
      msg: "Post creado ",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al crear nuevo post",
    });
  }
};

// --Se consultan todas las Publicaciones--

ctrl.obtenerPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
    //res.send({
    //  msg: "Posts Obtenidos ",
    //  posts,
    //});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al consultar los posts",
    });
  }
};

// --Se actualiza el contenido de una Publicacion--

ctrl.actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id);
    post.set(req.body);

    //  Se guarda en la BD
    await post.save();

    res.json({
      msg: "Post actualizado ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al actualizar post",
    });
  }
};

// --Se elimina una Publicacion--

ctrl.eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;

    await Posts.destroy({
      where: {
        id,
      },
    });
    res.json({
      msg: "Post eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar post",
    });
  }
};

// --Se consulta una Publicacion--

ctrl.obtenerPost = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    return post;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al consultar post",
    });
  }
};

module.exports = ctrl;
