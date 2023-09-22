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
            <div class="d-flex flex-column justify-content-between">
                <h5><b>${post.titulo}</b></h5>
                <p>${post.contenido}</p>
                <p><b>Autor:  ${post.autor}</b></p>
                <p><b>Fecha :  ${post.fecha}</b></p>
                
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
