async function cargarProductos() {
    try {
        const respuesta = await fetch("./productos.json");
        const productos = await respuesta.json();

        const contenedor = document.getElementById("contenedorProductos");
        const inputMaterial = document.getElementById("material");

        contenedor.innerHTML = "";

        productos.forEach(prod => {
            const card = document.createElement("article");
            card.className = "group rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 hover:shadow-md transition-shadow";

            card.innerHTML = `
        <div class="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold">${prod.nombre}</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">${prod.descripcion}</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-sm text-neutral-500">${prod.precioUnidad}</span>
            <a href="#contacto" class="btn-consultar text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline" data-nombre="${prod.nombre}">Consultar</a>
          </div>
        </div>
      `;
            contenedor.appendChild(card);
        });

        // Delegación de eventos para los botones "Consultar"
        contenedor.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-consultar")) {
                const nombreProducto = e.target.getAttribute("data-nombre");

                if (inputMaterial) {
                    inputMaterial.value = nombreProducto;
                }

                // Mover el foco al input y luego desplazarse a #contacto
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

cargarProductos();
