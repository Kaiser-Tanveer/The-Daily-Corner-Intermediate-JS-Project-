// load Category
const loadCategory = async() =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
    }
    catch{
        console.log(error);
    }
}

// Display Categories
const displayCategory = catagories =>{
    for(const category of catagories){
        console.log(category);
    const categoryTray = document.getElementById('category-tray');
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col')
    categoryDiv.innerHTML = `
    <button>${category.category_name}</button>
    `;
    categoryTray.appendChild(categoryDiv);
    }
}

loadCategory()



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
        // console.log(news);
        
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
            <div class="row align-items-center">
                <div class="col d-flex"><img src="${news.author.img}" class="w-25 rounded-circle" alt="" /> 
                <div class="ms-2">
                <h6>${news.author.name}</h6>
                <p>${news.author.published_date.slice(0,10)}</p>
                </div>
                </div>
                <div class="col text-center"><i class="fa-solid fa-eye fs-12">${news.total_view}</i></div>
                <div class="col text-end">Show more <i class="fa-solid fa-arrow-right"></i></div>
            </div>
            </div>
        </div>
    `;

    newsTray.appendChild(newDiv);
});
};


function showMore(){
    const newsModal = document.getElementById('news-modal');
    newsModal.innerHTML =`
    <p></p>
    <p></p>
    <p></p>
    `;
}

loadNews();