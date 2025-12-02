// Carrega cidades do arquivo JSON
async function carregarCidades() {
    const response = await fetch("/assets/data/cidades.json");
    const cidades = await response.json();

    const select = document.getElementById("cidadeSelect");

    cidades.forEach(cidade => {
        const op = document.createElement("option");
        op.value = cidade;   // exemplo: "São Paulo,BR"
        op.textContent = cidade;
        select.appendChild(op);
    });
}

// Executa ao abrir a página
carregarCidades();

// Busca clima usando rota protegida do Vercel
document.getElementById("btnBuscar").addEventListener("click", buscarClima);

async function buscarClima() {
    const select = document.getElementById("cidadeSelect");
    const cidade = select.value;

    if (!cidade) {
        alert("Selecione uma cidade.");
        return;
    }

    const response = await fetch(`/api/clima?cidade=${encodeURIComponent(cidade)}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById("resultado").innerHTML = `<p>Erro: ${data.error}</p>`;
        return;
    }

    document.getElementById("resultado").innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Clima: ${data.weather[0].description}</p>
    `;
}
