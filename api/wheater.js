export default async function handler(req, res) {
    const cidade = req.query.cidade;
    
    // SUA API KEY AQUI
    const API_KEY = process.env.OPENWEATHER_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        res.status(200).json(data);

    } catch (erro) {
        res.status(500).json({ erro: "Erro ao consultar API externa" });
    }
}
