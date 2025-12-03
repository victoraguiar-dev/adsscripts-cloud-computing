export default async function handler(req, res) {
    const cidade = req.query.cidade;

    if (!cidade) {
        return res.status(400).json({ error: "Cidade não informada" });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao consultar a API" });
    }
}
