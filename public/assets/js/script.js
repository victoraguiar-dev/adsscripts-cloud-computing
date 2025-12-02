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
