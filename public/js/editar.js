// ****** Referencia al elemento de formulario HTML ******
const formEditar = document.querySelector("#form-editar");

const obtenerPost = async (id) => {
  const response = await fetch(`/post/${id}`);
  const data = await response.json();
  return data;
};
const id = formEditar.dataset.id;

//***** Carga al documento HTML ******

document.addEventListener("DOMContentLoaded", async () => {
  const post = await obtenerPost(id);

  const titulo = document.getElementById("#titulo-post");
  const contenido = document.getElementById("#detalle-post");
  const url_img = document.getElementById("#url-img");
  const fecha = document.getElementById("#fecha");
  const autor = document.getElementById("#autor");

  titulo.value = post.titulo;
  contenido.value = post.contenido;
  url_img.value = post.url_img;
  fecha.value = post.fecha;
  autor.value = post.autor;
});

function validarImagen(url) {
  const imageExtension = /\.(png|jpe?g|gif|bmp|webp)$/i;
  return imageExtension.test(url);
}

formEditar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = formEditar.dataset.id;

  // ****** Capturan los datos del formulario ******

  const titulo = document.querySelector("#titulo-post").value;
  const contenido = document.querySelector("#detalle-post").value;
  const url_img = document.querySelector("#url-img").value;
  const fecha = document.querySelector("#fecha").value;
  const autor = document.querySelector("#autor").value;

  // ****** Validar los campos del formulario ******

  if (titulo.length == 0) {
    alert("El campo titulo no puede estar vacio");
    return false;
  }

  if (contenido.length == 0) {
    alert("El campo contenido no puede estar vacio");
    return false;
  }

  if (!validarImagen(url_img)) {
    alert("Por favor, ingrese una URL de imagen válida.");
    throw new Error("Imagen no válida");
  }

  if (fecha.length == 0) {
    alert("El campo fecha no puede estar vacio");
    return false;
  }
  if (autor.length == 0) {
    alert("El campo autor no puede estar vacio");
    return false;
  }

  // ****** Enviar los datos al servidor ******
  const response = await fetch(`/post/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, contenido, url_img, fecha, autor }),
  });
  const data = await response.json();
  console.log(data);

  alert(data.msg);
  location.href = "/";
});
