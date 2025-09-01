// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

//Envio de consulta por whatsapp
document.getElementById("formWhatsApp").addEventListener("submit", function (e) {
    e.preventDefault();

    const numeroWhatsApp = "5491160567581";
    const nombre = document.getElementById("nombre").value;
    const material = document.getElementById("material").value;
    const mensaje = document.getElementById("mensaje").value;
    const texto = `Hola, soy ${nombre}. Quisiera saber más acerca del ${material}. Consulta - Detalles: ${mensaje}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
})

//DropDown Botones
const cuarzoDropBtn = document.getElementById("cuarzoDropBtn");
const cuarzodropContent = document.getElementById("cuarzoDropContent");
const sintetizadoDropBtn = document.getElementById("sintetizadoDropBtn");
const sintetizadoDropContent = document.getElementById("sintetizadoDropContent");

const allDropdowns = [cuarzodropContent, sintetizadoDropContent];

function dropDown(btn, drop) {
    btn.addEventListener("click", () => {
        // Cerrar todos antes
        allDropdowns.forEach(d => {
            if (d !== drop) d.classList.add("hidden");
        });
        // Abrir/cerrar el actual
        drop.classList.toggle("hidden");
    });

    // Cerrar si se hace click fuera
    document.addEventListener("click", (e) => {
        allDropdowns.forEach(d => {
            if (!d.contains(e.target) && e.target !== cuarzoDropBtn && e.target !== sintetizadoDropBtn) {
                d.classList.add("hidden");
            }
        });
    });
}

dropDown(cuarzoDropBtn, cuarzodropContent);
dropDown(sintetizadoDropBtn, sintetizadoDropContent);

//Zoom IMG
const modalDos = document.getElementById("modalDos");
const modalImg = document.getElementById("modal-img");
const closeModalDos = document.getElementById("closeModalDos");

// Seleccionar todas las imágenes de la galería
document.querySelectorAll(".grid img").forEach(img => {
    img.addEventListener("click", () => {
        modalDos.classList.remove("hidden");
        modalImg.src = img.src; // usa el src de la imagen clickeada
    });
});

// Cerrar modal
closeModalDos.addEventListener("click", () => {
    modalDos.classList.add("hidden");
});

// Cerrar si se hace click fuera de la imagen
modalDos.addEventListener("click", (e) => {
    if (e.target === modalDos) {
        modalDos.classList.add("hidden");
    }
});
