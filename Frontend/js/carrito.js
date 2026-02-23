document.addEventListener('DOMContentLoaded', () => {
  const carritoContainer = document.getElementById('carrito-container');
  const totalCarrito = document.getElementById('totalCarrito');
  const btnVaciar = document.getElementById('vaciarCarrito');
  const btnConfirmar = document.getElementById('confirmarCompra');
  const carritoIdSpan = document.getElementById('carrito-id');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let carritoId = localStorage.getItem('carritoId');

  // ✅ Siempre genera un ID si no hay uno guardado
  if (!carritoId) {
    carritoId = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('carritoId', carritoId);
  }

  if (carritoIdSpan && carritoId) {
    carritoIdSpan.textContent = carritoId;
  }

  function renderCarrito() {
    carritoContainer.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
      totalCarrito.textContent = '$0.00';
      // ✅ Mostrar aún el ID aunque esté vacío (opcional: quítalo si no quieres)
      if (carritoIdSpan) carritoIdSpan.textContent = carritoId;
      return;
    }

    carrito.forEach((producto, index) => {
      const subtotal = producto.precio * producto.cantidad;
      total += subtotal;

      const item = document.createElement('div');
      item.className = 'carrito-item box';
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="80">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <label>Cantidad:
          <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-input">
        </label>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <button data-index="${index}" class="btn-eliminar">Eliminar</button>
      `;

      carritoContainer.appendChild(item);
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
  }

  function actualizarCantidad(index, nuevaCantidad) {
    carrito[index].cantidad = nuevaCantidad;
    guardarYRenderizar();
  }

  function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarYRenderizar();
  }

  function guardarYRenderizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  }

  // Eventos
  carritoContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('cantidad-input')) {
      const index = e.target.getAttribute('data-index');
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad >= 1) {
        actualizarCantidad(index, nuevaCantidad);
      }
    }
  });

  carritoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = e.target.getAttribute('data-index');
      eliminarProducto(index);
    }
  });

  btnVaciar.addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito');
    localStorage.removeItem('carritoId');
    if (carritoIdSpan) carritoIdSpan.textContent = '';
    renderCarrito();
  });

  btnConfirmar.addEventListener('click', () => {
    if (carrito.length > 0) {
      alert('¡Pedido realizado con éxito!');
      carrito = [];
      localStorage.removeItem('carrito');
      localStorage.removeItem('carritoId');
      if (carritoIdSpan) carritoIdSpan.textContent = '';
      renderCarrito();
    } else {
      alert('Tu carrito está vacío.');
    }
  });

  renderCarrito();
});


