// Referencia al elemento de formulario html
const formGuardar = document.querySelector("#form-eliminar");

const eliminarPost = async (id) => {
  const response = await fetch(`/post/${id}`);
  const data = await response.json();
  return data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const id = formGuardar.dataset.id;
  const post = await eliminarPost(id);

  const titulo = document.querySelector("#titulo-post");
  const contenido = document.querySelector("#detalle-post");
  const url_img = document.querySelector("#url-img");
  const fecha = document.querySelector("#fecha");
  const autor = document.querySelector("#autor");

  titulo.value = post.titulo;
  contenido.value = post.contenido;
  url_img.value = post.url_img;
  fecha.value = post.fecha;
  autor.value = post.autor;
});

formGuardar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = formGuardar.dataset.id;

  // Enviar al servidor
  const response = await fetch(`/post/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  alert(data.msg);
  location.href = "/";
});
