// ****** Referencia al elemento de formulario HTML ******
const formGuardar = document.querySelector("#form-guardar");

formGuardar.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ****** Captura de  los datos del formulario ******
  const titulo = document.querySelector("#titulo-post").value;
  const contenido = document.querySelector("#detalle-post").value;
  const url_img = document.querySelector("#url-img").value;
  const fecha = document.querySelector("#fecha").value;
  const autor = document.querySelector("#autor").value;

  // ****** Validar los campos del formulario ******

  if (titulo.length == 0) {
    alert("El titulo no puede estar vacio");
    return false;
  }

  if (contenido.length == 0) {
    alert("El contenido no puede estar vacio");
    return false;
  }

  if (url_img.length == 0) {
    alert("La URL no puede estar vacio");
    return false;
  }

  if (fecha.length == 0) {
    alert("El fecha no puede estar vacio");
    return false;
  }
  if (autor.length == 0) {
    alert("El autor no puede estar vacio");
    return false;
  }

  // ****** Enviar datos al servidor ******
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

const mostrarPosts = (posts, elementoHtml) => {
  let secciones = "";

  // ****** Método para recorrer los registros ******
  posts.forEach((post) => {
    secciones += `
            <section class="d-flex  mb-5 p-1 rounded border border-dark">
                <img src="${post.url_img}" class="rounded p-3" height=100 >
             
               <div class="d-flex flex-column justify-content-between">
                   <h5><b>${post.titulo}</b></h5>
                   <p>${post.contenido}</p>
                   <p><b>Autor:  ${post.autor}</b></p>
                   <p><b>Fecha :  ${post.fecha}</b></p>
                
                   <div class = "d-flex justify-content-start gap-2 ">
                      <a href= "/admin/${post.id}" class="btn btn-dark mb-2 text-center">Edit</a>
                      <a href= "/eliminar/${post.id}" class="btn btn-dark ">Borrar</a>
                    </div>
                </div>
            </section>
        `;
  });

  // ****** Se crea la lista ******
  elementoHtml.innerHTML = secciones;
};

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await obtenerPosts();

  console.log(posts);

  // ****** Modificar el DOM para mostrar las publicaciones ******
  const main = document.querySelector("#lista-publicaciones");

  mostrarPosts(posts, main);
});
