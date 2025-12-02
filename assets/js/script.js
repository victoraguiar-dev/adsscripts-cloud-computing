// assets/js/script.js
const select = document.getElementById('cidadeSelect');
const btnBuscar = document.getElementById('btnBuscar');
const resultado = document.getElementById('resultado');
const debug = document.getElementById('debug');

function logDebug(msg) {
  console.log(msg);
  if (debug) {
    const time = new Date().toLocaleTimeString();
    debug.innerHTML = `${time} — ${msg}`;
  }
}

// Construir o URL do JSON de forma robusta, independente de onde o arquivo esteja servido
const dataUrl = new URL('../data/cidades.json', import.meta.url).href;
logDebug(`Tentando carregar cidades do: ${dataUrl}`);

async function carregarCidades() {
  try {
    const res = await fetch(dataUrl, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ao buscar ${dataUrl}`);
    }
    const json = await res.json();
    if (!json || !Array.isArray(json.cidades)) {
      throw new Error('Formato inválido do JSON: esperar {"cidades": [ ... ]}');
    }

    // limpar e popular
    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- selecione --';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    json.cidades.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c.split(',')[0]; // apenas o nome visível
      select.appendChild(opt);
    });

    logDebug(`Carregadas ${json.cidades.length} cidades com sucesso.`);
  } catch (err) {
    console.error('Erro ao carregar cidades:', err);
    debug.innerHTML = `Erro ao carregar cidades: ${err.message}`;
    select.innerHTML = '<option disabled>Erro ao carregar cidades</option>';
  }
}

btnBuscar.addEventListener('click', () => {
  const val = select.value;
  if (!val) {
    resultado.innerHTML = `<p style="color:orange">Selecione uma cidade primeiro</p>`;
    return;
  }
  resultado.innerHTML = `<p>Você selecionou: <strong>${val}</strong></p>`;
});

// Iniciar o carregamento
carregarCidades();
