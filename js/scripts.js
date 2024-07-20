// import { loadArticles } from './try.js';

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
});


const loadArticles = async () => {
    try {
        const response = await fetch('./js/x.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error loading JSON:', error);
        return [];
    }
};

// Fetch and display news
async function fetchNews() {
    const apiKey = '64bdf10097124f9b98e5a516bed2e681';
    // const url = `https://newsapi.org/v2/everything?q=blockchain&from=2024-07-20&sortBy=publishedAt&apiKey=${apiKey}`;
    // const url = `https://newsapi.org/v2/everything?q=technology&language=en&from=2024-06-20&pageSize=15&sortBy=publishedAt&apiKey=64bdf10097124f9b98e5a516bed2e681`
    // const url = `https://newsapi.org/v2/everything?q=technology&pageSize=15&language=en&from=2024-06-19&sortBy=publishedAt&apiKey=64bdf10097124f9b98e5a516bed2e681`;

    try {
        // const response = await fetch(url);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        const articles = await loadArticles();
        // const data = await response.json();
        displayNews(articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const defaultimg = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'p-4 md:w-1/3';
        
        // newsItem.innerHTML = `
        //     <div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
        //         <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${(article.urlToImage != "")?article.urlToImage:defaultimg}" alt="news image">
        //         <div class="p-6">
        //             <h2 class="text-base font-medium text-indigo-300">${article.source.name}</h2>
        //             <h1 class="text-2xl font-semibold mb-3">${article.title}</h1>
        //             <p class="leading-relaxed mb-3">${article.description}</p>
        //         </div>
        //         <div class="flex items-center flex-wrap">
        //                 <button class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" onclick="window.open('${article.url}', '_blank')">Read More</button>
        //                 // <button class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" onclick="summarizeNews(this)">Summarize</button>
        //                 // <span class="summary hidden text-gray-600 ml-auto leading-none text-sm">Summary will appear here...</span>
        //             </div>
        //     </div>
        // `;
        newsItem.innerHTML = `
    <div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${article.urlToImage}" alt="news image">
        <div class="p-6">
            <h2 class="text-base font-medium text-indigo-500">${article.source.name}</h2>
            <h1 class="text-2xl font-semibold mb-3">${article.title}</h1>
            <p class="leading-relaxed mb-3">${article.description}</p>
            <div class="flex items-center flex-wrap">
                <a href="${article.url}" target="_blank" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Read More</a>
            </div>
        </div>
    </div>
`;


        newsContainer.appendChild(newsItem);
    });
}

// Call the function to fetch and display news
fetchNews();
