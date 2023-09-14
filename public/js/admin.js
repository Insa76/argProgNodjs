// Referencia al elemento de formulario html
const formGuardar = document.querySelector("#form-guardar");

formGuardar.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Se capturan los datos del formulario
  const titulo = document.querySelector("#titulo-post").value;
  const contenido = document.querySelector("#detalle-post").value;
  const url_img = document.querySelector("#url-img").value;
  const fecha = document.querySelector("#fecha").value;

  // Enviar al servidor
  const response = await fetch("/post", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, contenido, url_img, fecha }),
  });
  const data = await response.json();

  alert(data.msg);
  location.href = "/";
});
