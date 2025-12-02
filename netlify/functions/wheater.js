export default async function handler(req, res) {
    const API_KEY = process.env.OPENWEATHER_KEY;  // 🔒 escondida no servidor

    const { cidade } = req.query;

    if (!cidade)
        return res.status(400).json({ error: "Cidade não informada" });

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${API_KEY}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ error: "Erro ao consultar API" });
    }
}
