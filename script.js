// Configurações
const NEWS_CONTAINER = document.getElementById("news-container");
const LOADING_MSG = "<p>Carregando notícias do Serebii...</p>";
const ERROR_MSG = "<p>Não foi possível carregar as notícias. Tente novamente mais tarde.</p>";

// URL do proxy para scraping do Serebii (exemplo com CORS Anywhere)
const SEREBII_NEWS_URL = "https://cors-anywhere.herokuapp.com/https://www.serebii.net/index2.shtml";

async function fetchSerebiiNews() {
    NEWS_CONTAINER.innerHTML = LOADING_MSG;

    try {
        const response = await fetch(SEREBII_NEWS_URL);
        const html = await response.text();
        
        // Cria um parser de HTML virtual
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        // Extrai as notícias (adaptado à estrutura do Serebii)
        const newsItems = doc.querySelectorAll("td.foopicnoborder table tr:not(:first-child)");
        
        let newsHTML = "";
        newsItems.forEach((item, index) => {
            if (index > 5) return; // Limita a 6 notícias
            
            const title = item.querySelector("td:last-child font b")?.textContent.trim() || "Sem título";
            const link = item.querySelector("a")?.href || "#";
            const date = item.querySelector("td:last-child font:nth-child(2)")?.textContent.trim() || "";
            
            // Link absoluto para o Serebii
            const fullLink = link.startsWith("http") ? link : `https://www.serebii.net${link}`;
            
            newsHTML += `
                <div class="news-card">
                    <img src="https://www.serebii.net/shiny/eevee.png" alt="${title}">
                    <h3>${title}</h3>
                    <p><small>${date}</small></p>
                    <a href="${fullLink}" target="_blank">Ler no Serebii</a>
                </div>
            `;
        });
        
        NEWS_CONTAINER.innerHTML = newsHTML || ERROR_MSG;
    } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        NEWS_CONTAINER.innerHTML = ERROR_MSG;
    }
}

// Carrega as notícias ao abrir a página
window.onload = fetchSerebiiNews;
