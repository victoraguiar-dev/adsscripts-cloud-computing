import cidadesBrasil from "../data/cidades.js";

// Popula dropdown
const select = document.getElementById("cidadeSelect");
cidadesBrasil.forEach(cidade => {
    const op = document.createElement("option");
    op.value = cidade;
    op.textContent = cidade;
    select.appendChild(op);
});

document.getElementById("btnBuscar").addEventListener("click", buscarClima);

async function buscarClima() {
    const cidade = select.value;

    const response = await fetch(`/api/clima?cidade=${cidade}`);
    const data = await response.json();

    document.getElementById("resultado").innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Clima: ${data.weather[0].description}</p>
    `;
}
