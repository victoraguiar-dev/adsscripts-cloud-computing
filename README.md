# Consulta de Clima - Projeto Integrador (API + Serverless + Vercel)

Este projeto demonstra a aplicação de conceitos de **cloud computing**, utilizando uma **Função Serverless** hospedada no **Vercel** para consultar uma **API externa (OpenWeatherMap)**. O objetivo é proteger a chave da API e exibir informações meteorológicas no navegador em HTML.

A aplicação permite ao usuário selecionar uma cidade a partir de uma lista local em JSON e visualizar dados como **temperatura**, **umidade** e **condição atual do clima**.

---

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

* **`vercel.json`**: Configurações do Vercel para o projeto.
* **`README.md`**: Este arquivo.
* **`api/clima.js`**: A Função Serverless (Backend).
* **`public/index.html`**: Página principal para seleção da cidade.
* **`public/pages/details.html`**: Página para exibição dos detalhes do clima.
* **`public/assets/css/style.css`**: Estilos da aplicação (CSS).
* **`public/assets/js/script.js`**: Lógica de interação do Front-end (JavaScript).
* **`public/assets/data/cidades.json`**: Lista de cidades disponíveis para consulta.

---

## Tecnologias Utilizadas

### Frontend
* **HTML**
* **CSS**
* **JavaScript**

### Backend & Infraestrutura
* **API Externa**: [OpenWeatherMap](https://openweathermap.org)
* **Hospedagem Cloud/Serverless**: [Vercel](https://vercel.com/) (Execução da Função Serverless e hospedagem do Front-end)

---

## Arquitetura do Sistema

A arquitetura foi projetada com foco em **segurança** e **escalabilidade**, separando a lógica de apresentação e a consulta à API.

### 1. Front-end
* Carrega a lista de cidades a partir do arquivo local (`cidades.json`).
* Controla a interface de usuário.
* Faz requisições à **Função Serverless** do Vercel para obter os dados do clima.

### 2. Função Serverless (Backend)
**Arquivo:** `/api/clima.js`

Esta função é executada sob demanda pelo Vercel e é a **única** responsável por:
* Receber o nome da cidade como parâmetro da requisição do Front-end.
* **Consultar a API OpenWeatherMap** (utilizando a chave de API segura).
* Retornar o JSON com os dados do clima para o Front-end.
* **Proteger a chave da API**, impedindo que ela seja exposta no código do cliente.

### 3. Vercel
* Hospeda os arquivos estáticos do Front-end.
* Executa a função Serverless (`/api/clima.js`) sob demanda.
* **Armazena e injeta a variável de ambiente** com a chave da API.

---

## Proteção da Chave da API (Security)

A chave da API **NÃO** fica armazenada no código do Front-end. A segurança é garantida pela injeção da variável de ambiente no **Vercel**:

* **Localização da Chave**: `Vercel` → `Settings` → `Environment Variables`
* **Variável de Ambiente**: `WEATHER_API_KEY`

O arquivo Serverless (`clima.js`) lê a chave do ambiente de execução de forma segura

## Deploy na Vercel

O deploy é configurado para ocorrer automaticamente a partir do GitHub. Durante o processo, o Vercel:

* Detecta o tipo de projeto.
* Cria a rota Serverless em `/api/clima`.
* Serve os arquivos estáticos localizados em `/public`.
* Aplica as variáveis de ambiente (como a `WEATHER_API_KEY`).
* Gera a URL final de produção para o acesso à aplicação.

---

## Informações Adicionais

Projeto acadêmico de uso livre para fins educacionais. Desenvolvido por Victor Aguiar como parte de estudos de computação em nuvem e integração com APIs.
