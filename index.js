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