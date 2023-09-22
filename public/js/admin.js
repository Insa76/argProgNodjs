// Referencia al elemento de formulario html
const formGuardar = document.querySelector("#form-guardar");

formGuardar.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Se capturan los datos del formulario
  const titulo = document.querySelector("#titulo-post").value;
  const contenido = document.querySelector("#detalle-post").value;
  const url_img = document.querySelector("#url-img").value;
  const fecha = document.querySelector("#fecha").value;
  const autor = document.querySelector("#autor").value;

  // Enviar al servidor
  const response = await fetch("/post", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, contenido, url_img, fecha, autor }),
  });
  const data = await response.json();

  alert(data.msg);
  location.href = "/";
});

const obtenerPosts = async () => {
  const response = await fetch("/posts");
  const data = await response.json();
  return data;
};

const mostrarPost = (posts, elementoHtml) => {
  let secciones = "";

  // Método para recorrer los registros
  posts.forEach((post) => {
    secciones += `
            <section class="d-flex  mb-5 p-1 rounded border border-dark">
            <img src="${post.url_img}" class="rounded p-3" height=100 >
            <div class="d-flex justify-content-between">
             <div class="d-flex flex-column justify-content-between">
                <h5><b>${post.titulo}</b></h5>
                <p>${post.contenido}</p>
                <p><b>Autor:  ${post.autor}</b></p>
                <p><b>Fecha :  ${post.fecha}</b></p>
                
                 
              </div>
              <a href= "/admin/${post.id}" class="btn btn-dark m-5">Edit</a>
              <a href= "/admin" class="btn btn-dark mt-5">Borrar</a>

            </div>  
            </section>
        `;
  });

  // Se crea la lista
  elementoHtml.innerHTML = secciones;
};

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await obtenerPosts();
  console.log(posts);

  // Modificar el DOM para mostrar las publicaciones
  const main = document.querySelector("#lista-publicaciones");

  mostrarPost(posts, main);
});
