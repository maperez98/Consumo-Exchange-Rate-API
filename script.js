// Referencias a los elementos del HTML
const btn = document.getElementById('btn');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const resultEl = document.getElementById('result');

// Tu API Key de ExchangeRate-API
const apiKey = '9dd9ed60a1765ce014c24da2';

/**
 * Construye la URL de la API de ExchangeRate-API.
 * Ejemplo: https://v6.exchangerate-api.com/v6/9dd9ed60a1765ce014c24da2/latest/USD
 */
function buildUrl(from) {
  return `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
}

/**
 * Llama a la API y muestra la tasa de cambio.
 */
async function fetchRate(from, to) {
  resultEl.innerHTML = 'Cargando...';

  try {
    const url = buildUrl(from);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);

    const data = await response.json();
    const rate = data.conversion_rates[to];

    if (!rate) throw new Error('Moneda no encontrada');

    resultEl.innerHTML = `
      <h2>Tasa de cambio</h2>
      <p><strong>1 ${from}</strong> = ${rate} ${to}</p>
      <p><small>Última actualización: ${data.time_last_update_utc}</small></p>
    `;
  } catch (error) {
    console.error(error);
    resultEl.innerHTML = `<p class="error">No se pudo obtener la tasa: ${error.message}</p>`;
  }
}

// Evento del botón
btn.addEventListener('click', () => {
  const from = fromInput.value.trim().toUpperCase();
  const to = toInput.value.trim().toUpperCase();

  if (!from || !to) {
    resultEl.innerHTML = '<p class="error">Ingresa ambas monedas (ej: USD y COP)</p>';
    return;
  }

  fetchRate(from, to);
});

// Llamada inicial
fetchRate('USD', 'COP');
