// Referencia al elemento de formulario html
const formGuardar = document.querySelector("#form-guardar");

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

  titulo.value = post.titulo;
  contenido.value = post.contenido;
  url_img.value = post.url_imagen;
  fecha.value = post.fecha;
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
    body: JSON.stringify({ titulo, contenido, url_img, fecha, autor }),
  });
  const data = await response.json();

  alert(data.msg);
  location.href = "/";
});
