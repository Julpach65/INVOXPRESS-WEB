const productos = [
  "Martillo",
  "Lima",
  "Lijadora",
  "Sierra circular",
  "Taladro",
  "Desatornillador",
  "Rodillos",
  "Pinturas",
  "Imprimaciones",
  "Overoles",
  "Bandejas de pintura",
  "Espatulas",
  "Careta",
  "Botas de seguridad",
  "Cepillo de alambre",
  "Pinzas portaelectrodo",
  "Electrodos",
  "Gafas de seguridad"
];

const searchInput = document.querySelector(".search-input");
const suggestions = document.querySelector(".suggestions");

if (searchInput && suggestions) {
  searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase();
    suggestions.innerHTML = "";

    if (texto.length === 0) return;

    const coincidencias = productos.filter(producto =>
      producto.toLowerCase().includes(texto)
    );

    coincidencias.forEach(producto => {
      const li = document.createElement("li");
      const enlace = document.createElement("a");
      enlace.href = `Productos.html?busqueda=${encodeURIComponent(producto)}`;
      enlace.textContent = producto;
      li.appendChild(enlace);
      suggestions.appendChild(li);
    });
  });
}

