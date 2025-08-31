async function cargarProductos(filtro = "all") {
  try {
    const respuesta = await fetch("./productos.json");
    const productos = await respuesta.json();

    const contenedor = document.getElementById("contenedorProductos");
    const inputMaterial = document.getElementById("material");

    contenedor.innerHTML = "";

    // Agrupar por categoría
    const grupos = {};
    productos.forEach(prod => {
      if (filtro === "all" || prod.categoria === filtro) {
        if (!grupos[prod.categoria]) grupos[prod.categoria] = [];
        grupos[prod.categoria].push(prod);
      }
    });

    // Renderizar cada categoría
    for (const categoria in grupos) {
      // Título
      const titulo = document.createElement("h2");
      titulo.textContent = categoria;
      titulo.className = "text-3xl md:text-4xl font-bold mt-10 mb-6 text-center";
      contenedor.appendChild(titulo);

      // Grid
      const grid = document.createElement("div");
      grid.className = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

      grupos[categoria].forEach(prod => {
        const card = document.createElement("article");
        card.className =
          "group rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 hover:shadow-md transition-shadow";

        card.innerHTML = `
          <div class="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold">${prod.nombre}</h3>
            <h4>(${prod.categoria})</h4>
            <div class="mt-3 flex items-center justify-between">
              <a href="#contacto" class="btn-consultar text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline" data-nombre="${prod.nombre}">Consultar</a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });

      contenedor.appendChild(grid);
    }

    // Delegación de eventos para los botones "Consultar"
    contenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-consultar")) {
        const nombreProducto = e.target.getAttribute("data-nombre");

        if (inputMaterial) {
          inputMaterial.value = nombreProducto;
        }

        setTimeout(() => {
          document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
          inputMaterial.focus();
        }, 100);
      }
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Inicializar render (todos los productos)
cargarProductos();

// Filtros con los botones
const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filtro = btn.dataset.filter;
    cargarProductos(filtro);
  });
});