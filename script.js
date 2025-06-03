// server.js (seu backend Node.js)
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/serebii-news', async (req, res) => {
    try {
        const response = await axios.get('https://www.serebii.net/index2.shtml');
        const $ = cheerio.load(response.data);
        
        const newsItems = [];
        $('td.foopicnoborder table tr:not(:first-child)').each((index, element) => {
            if (index > 5) return;
            
            const title = $(element).find('td:last-child font b').text().trim() || "Sem título";
            const link = $(element).find('a').attr('href') || "#";
            const date = $(element).find('td:last-child font:nth-child(2)').text().trim() || "";
            
            newsItems.push({
                title,
                link: link.startsWith('http') ? link : `https://www.serebii.net${link}`,
                date,
                imageUrl: 'https://www.serebii.net/shiny/eevee.png'
            });
        });
        
        res.json({ newsItems });
    } catch (error) {
        console.error('Error fetching Serebii news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
