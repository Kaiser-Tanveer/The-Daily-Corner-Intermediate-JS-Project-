// Load news 
const loadNews = async() =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/category/01`;
    fetch(url)
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    }
    catch{
        console.log(error);
    }
}

// Display News 
const displayNews = allNews => {
    allNews.forEach(news => {
        console.log(news);

        // Category
    const categoryTray = document.getElementById('category-btn');
    categoryTray.innerText = `${news.category_name}`;
        
        // News Tray 
    const newsTray = document.getElementById('news-tray');
    const newDiv = document.createElement('div');
    newDiv.classList.add('col');
    newDiv.innerHTML = `
        <div class="card">
            <img src="${news.image_url}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${news.details.slice(0,200)}...</p>
            </div>
        </div>
    `;

    newsTray.appendChild(newDiv);
});
}

loadNews();