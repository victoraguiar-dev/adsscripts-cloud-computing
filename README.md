Consulta de Clima – Projeto Integrador (API + Serverless + Vercel)

Este projeto aplica os conceitos de cloud computin, consultando uma API externa (OpenWeatherMap), protegendo a chave de API e exibindo informações meteorológicas no navegador em HTML.
A aplicação permite selecionar uma cidade de uma lista em JSON e visualizar temperatura, umidade e condição atual do clima.


Estrutura do Projeto
/
├── vercel.json
├── README.md
├── api/
│   └── clima.js
└── public/
    ├── index.html/
    ├── pages/
    │   ├── details.html
    ├── assets/
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── script.js
    │   └── data/
    │       └── cidades.json

Tecnologias Utilizadas no Frontend

- HTML
- CSS
- JavaScript

Tecnologias Utilizadas no Backend

- API Externa OpenWeatherMap (https://openweathermap.org)

- Hospedagem cloud no Vercel (https://vercel.com/)

Arquitetura do Sistema

A arquitetura foi projetada para ser segura e escalável:

1. Front-end

Carrega a lista de cidades via arquivo local (cidades.json), exibe os dados do clima e faz requisições ao backend.

2. Função Serverless (Backend)

Arquivo:
/api/clima.js

Responsável por:
- Receber a cidade como parâmetro
- Consultar a API OpenWeatherMap
- Retornar o JSON para o front-end
- Proteger a chave da API

3. Vercel

Hospeda o site, executa a função serverless sob demanda e armazena a variável de ambiente (WEATHER_API_KEY)

Funcionamento
1. Carregamento da Lista de Cidades

O arquivo cidades.json contém uma lista simples:

[
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba"
]

O JavaScript popula automaticamente o <select> ao carregar a página.

2. Requisição do Clima

Ao selecionar uma cidade, o navegador envia:

GET /api/clima?cidade=São Paulo

A função serverless consulta a OpenWeatherMap e retorna algo como:

{
  "main": { "temp": 25, "humidity": 60 },
  "weather": [{ "description": "céu limpo" }]
}

3. Exibição na Interface

A aplicação mostra:

- Cidade
- Temperatura
- Umidade
- Condição do clima



Proteção da Chave da API

A chave NÃO fica armazenada no front-end. Ela está em:

Vercel → Settings → Environment Variables

Variável usada:

WEATHER_API_KEY

O arquivo clima.js lê a chave do ambiente:

const apiKey = process.env.WEATHER_API_KEY;

Deploy na Vercel

O deploy ocorre automaticamente a partir do GitHub.

A Vercel:

- Detecta o projeto
- Cria rota serverless em /api/clima
- Serve os arquivos estáticos em /public
- Aplica variáveis de ambiente
- Gera URL final de produção


Informações adicionais

Projeto acadêmico de uso livre para fins educacionais. Desenvolvido por Victor Aguiar como parte de estudos de computação em nuvem e integração com APIs.