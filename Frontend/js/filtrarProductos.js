window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const busqueda = params.get("busqueda");
  if (busqueda) {
    filtrarProductos(busqueda);
    const input = document.querySelector(".search-input");
    if (input) {
      input.value = busqueda;
    }
  }
});

function filtrarProductos(filtro) {
  const tarjetas = document.querySelectorAll(".product-card");
  if (tarjetas.length === 0) return;

  tarjetas.forEach(card => {
    const titulo = card.querySelector("h3").textContent.toLowerCase();
    if (titulo.includes(filtro.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


