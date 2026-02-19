function volver() {
  window.location.href = "index.html";
}

function abrirDetalle(tipo) {
  window.location.href = "detalle.html?tipo=" + tipo;
}

// Solo ejecutar si estamos en detalle.html
if (window.location.pathname.includes("detalle.html")) {

  const parametros = new URLSearchParams(window.location.search);
  const tipo = parametros.get("tipo");

  if (tipo) {
    cargarImagen(tipo);
  }

  async function cargarImagen(tipo) {

    const estado = document.getElementById("estado");
    const img = document.getElementById("imagenAPI");

    estado.innerText = "Cargando imagen desde la API...";
    img.src = "";

    let url;

    if (tipo === "gato") {
      url = "https://api.thecatapi.com/v1/images/search";
    } else {
      url = "https://dog.ceo/api/breeds/image/random";
    }

    try {

      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error("Error en la API");
      }

      const datos = await respuesta.json();

      if (tipo === "gato") {
        img.src = datos[0].url;
      } else {
        img.src = datos.message;
      }

      estado.innerText = "";

    } catch (error) {

      estado.innerText = "No se pudo cargar la imagen 😿";
      console.error(error);
    }
  }

  window.cargarOtra = function () {
    cargarImagen(tipo);
  };
}
