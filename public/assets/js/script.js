async function carregarCidades() {
    try {
        const response = await fetch("/assets/data/cidades.json");
        const cidades = await response.json();

        const select = document.getElementById("cidadeSelect");
        select.innerHTML = "<option value=''>Selecione uma cidade</option>";

        cidades.forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao carregar cidades:", error);
    }
}

carregarCidades();

async function buscarClima(cidade) {
    try {
        const base = "https://adsscripts-cloud-computing.vercel.app";
        const response = await fetch(`${base}/api/clima?cidade=${encodeURIComponent(cidade)}`);
        const data = await response.json();

        if (!response.ok) {
            console.error("Erro retornado pela API:", data);
            alert("Não foi possível obter o clima da cidade.");
            return;
        }

        atualizarTelaClima(data);

    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        alert("Erro ao consultar o servidor.");
    }
}



function atualizarTelaClima(cidade, dados) {

    document.getElementById("cidadeNome").textContent = cidade;

    document.getElementById("temperatura").textContent =
        dados.main.temp + " °C";

    document.getElementById("umidade").textContent =
        dados.main.humidity + " %";

    document.getElementById("condicao").textContent =
        dados.weather[0].description;

    document.getElementById("climaContainer").style.display = "block";
}


document.getElementById("cidadeSelect").addEventListener("change", (e) => {
    const cidade = e.target.value;

    if (cidade) {
        buscarClima(cidade);
    } else {
        document.getElementById("climaContainer").classList.add("hidden");
    }
});
