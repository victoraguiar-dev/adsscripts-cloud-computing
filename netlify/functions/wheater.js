export async function handler(event, context) {
  try {
    const city = event.queryStringParameters.city;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!city) return { statusCode: 400, body: "City missing" };
    if (!API_KEY) return { statusCode: 500, body: "Missing API key" };

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=pt_br`;

    const resp = await fetch(url);
    const data = await resp.json();

    return {
      statusCode: resp.ok ? 200 : resp.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
