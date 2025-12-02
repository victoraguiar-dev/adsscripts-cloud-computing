// ELEMENTOS
const form = document.getElementById("form");
const citySelect = document.getElementById("citySelect");

const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels");
const humidity = document.getElementById("humidity");
const errorEl = document.getElementById("error");

// Ir para página de detalhes
document.getElementById("detailsBtn").addEventListener("click", () => {
  window.location.href = "pages/details.html";
});


// 1) Carregar cidades da "base de dados" local
async function loadCities() {
  try {
    const res = await fetch("assets/data/cidades.json");
    const cities = await res.json();

    citySelect.innerHTML = `<option disabled selected>Selecione...</option>`;

    cities.forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c.split(",")[0]; // nome da cidade
      citySelect.appendChild(option);
    });
  } catch (err) {
    console.error(err);
    citySelect.innerHTML = `<option>Erro ao carregar cidades</option>`;
  }
}
loadCities();


// 2) Buscar previsão via serverless function
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const selected = citySelect.value;

  try {
    errorEl.classList.add("hidden");
    result.classList.add("hidden");

    const encoded = encodeURIComponent(selected);
    const res = await fetch(`/.netlify/functions/weather?city=${encoded}`);

    if (!res.ok) throw new Error("Erro ao consultar API");

    const data = await res.json();

    cityName.textContent = `${data.name} - ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    temp.textContent = data.main.temp;
    feels.textContent = data.main.feels_like;
    humidity.textContent = data.main.humidity;

    result.classList.remove("hidden");
  } catch (err) {
    errorEl.textContent = "Erro ao buscar previsão.";
    errorEl.classList.remove("hidden");
  }
});
