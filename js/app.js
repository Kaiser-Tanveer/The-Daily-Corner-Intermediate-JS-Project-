// load Category
const loadCategory = async() =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return displayCategory(data.data.news_category);
    }
    catch{
        console.log(error);
    }
}


// Display Categories
const displayCategory = catagories =>{
    const categoryTray = document.getElementById('category-tray');
    for(const category of catagories){
        // console.log(category);
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col');
    categoryDiv.innerHTML = `
    <a href="#" onclick="loadCategoryNews('${category.category_id}')" class="btn btn-outline-warning">${category.category_name}</a>
    `;
    categoryTray.appendChild(categoryDiv);
    }
}


// Load Catagory news 
const loadCategoryNews = (id)=>{
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryNews(data.data))
}

const sorted = (a, b) => {
    return b.total_view - a.total_view;
    }

// Display category News 
const displayCategoryNews = allNews =>{
    console.log(allNews)
    spinner(false)
    // Sorting
    let news = allNews.sort(sorted);
    console.log(news);
    
    const categoryNewsTray = document.getElementById('news-tray');
    categoryNewsTray.textContent = '';
    document.getElementById('cat-count').innerText = allNews.length;
    allNews.forEach(news =>{
        // console.log(news);
        const categoryNewsDiv = document.createElement('div');
        categoryNewsDiv.classList.add('col');
        categoryNewsDiv.innerHTML = `
        <div class="card">
        <img src="${news.image_url ? news.image_url : '<span class="text-warning">No Image found</span>'}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${news.title ? news.title : 'No Title Found'}</h5>
        <p class="card-text">${news.details ? news.details.slice(0,180) : '<span class="text-warning">No Detail found</span>'}...</p>

        <div class="row align-items-center">
        <div class="col-4 d-flex">
        <img class="w-25 h-50 rounded-circle" src="${news.author.img ? news.author.img : '<span class="text-warning">No Author found</span>'}">
        <div>
        <h6 class="ms-2">
        ${news.author.name ? news.author.name : '<span class="text-warning">No Author Name found</span>'}</h6>
        <p class="ms-2">${news.author.published_date ? news.author.published_date.slice(0,10) : '<span class="text-warning">No Publish Date found</span>'}</p>
        </div>
        </div>
        <div class="col-4 text-center"><i class="fa-regular fa-eye fs-6"> ${news.total_view ? news.total_view : '<span style="font-size: 10px" class="text-warning">No View found</span>'}</i></div>
        <div class="col-4 text-end btn-border-primary"><a href="#" onclick = "loadPost('${news._id}')" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Show More <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        </div>
        </div>
        </div>
        `;
        categoryNewsTray.appendChild(categoryNewsDiv);
    });
}



// Load Modal Post 
const loadPost = async postId => {
try{
    const url = `https://openapi.programming-hero.com/api/news/${postId}`
const res = await fetch(url);
    const data = await res.json();
    return displayPost(data.data[0]);
    // console.log(data.data[0])
}
catch{
    console.log(error);
}
}

const displayPost = async post => {
    console.log(post.title)

    // Modal 
document.getElementById('exampleModalLabel').innerHTML = `${post.title ? post.title : 'No Title Found'}`;
document.getElementById('modal-body').innerText = `${post.details ? post.details : 'No Detail found'}`;
document.getElementById('modal-footer').innerText = `Author: ${post.author.name ? post.author.name : 'No Author Name found'}`;
document.getElementById('auth-date').innerText = `Published: ${post.author.published_date ? post.author.published_date : 'No Publish Date found'}`;
}

// Spinner 
const spinner = (isloading) => {
    const loaderId = document.getElementById('loader');
    if(isloading){
        loaderId.classList.remove('d-none');
    }
    else{
        loaderId.classList.add('d-none');
    }
}





loadCategory();