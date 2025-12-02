async function carregarCidades() {
    try {
        const response = await fetch("/assets/data/cidades.json");
        const cidades = await response.json();

        console.log("JSON recebido:", cidades);

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


// ----------------------------
// 2) BUSCAR CLIMA NA API
// ----------------------------
async function buscarClima(cidade) {
    try {
        // 🔥 URL DA API DO VERCEL (com variável de ambiente)
        const API_URL = import.meta.env.OPENWEATHER_KEY;  
        // Ex: https://sua-api.vercel.app/api/clima?cidade=

        const response = await fetch(`${API_URL}?cidade=${encodeURIComponent(cidade)}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar clima");
        }

        const clima = await response.json();

        console.log("Clima recebido:", clima);

        atualizarTelaClima(cidade, clima);

    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        alert("Não foi possível obter o clima da cidade.");
    }
}


// ----------------------------
// 3) ATUALIZA A TELA
// ----------------------------
function atualizarTelaClima(cidade, dados) {
    document.getElementById("cidadeNome").textContent = cidade;
    document.getElementById("temperatura").textContent = dados.temperatura;
    document.getElementById("umidade").textContent = dados.umidade;
    document.getElementById("condicao").textContent = dados.condicao;

    document.getElementById("climaContainer").style.display = "block";
}


// ----------------------------
// 4) EVENTO AO TROCAR CIDADE
// ----------------------------
document.getElementById("cidadeSelect").addEventListener("change", (e) => {
    const cidade = e.target.value;

    if (cidade) {
        buscarClima(cidade);
    } else {
        document.getElementById("climaContainer").style.display = "none";
    }
});
