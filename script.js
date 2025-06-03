// Configurações
const NEWS_CONTAINER = document.getElementById("news-container");
const LOADING_MSG = "<p>Carregando notícias do Serebii...</p>";
const ERROR_MSG = "<p>Não foi possível carregar as notícias. Tente novamente mais tarde.</p>";

// URL direta do Serebii
const SEREBII_NEWS_URL = "https://www.serebii.net/index2.shtml";

async function fetchSerebiiNews() {
    NEWS_CONTAINER.innerHTML = LOADING_MSG;

    try {
        // Modo 'no-cors' - limitado, só funciona para alguns casos
        const response = await fetch(SEREBII_NEWS_URL, {
            mode: 'no-cors'
        });
        
        // Note que no modo 'no-cors' você não pode ler a resposta diretamente
        // Você precisaria de uma abordagem diferente aqui
        console.log("Requisição enviada, mas a resposta não pode ser lida devido ao CORS");
        
        // Alternativa: usar um iframe
        NEWS_CONTAINER.innerHTML = `
            <iframe 
                src="${SEREBII_NEWS_URL}" 
                style="width:100%; height:500px; border:none;"
                onload="console.log('Conteúdo carregado')"
                onerror="document.getElementById('news-container').innerHTML = '${ERROR_MSG}'">
            </iframe>
        `;
    } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        NEWS_CONTAINER.innerHTML = ERROR_MSG;
    }
}

window.onload = fetchSerebiiNews;
