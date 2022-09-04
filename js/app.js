// load Category
const loadCategory = async() =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
    }
    catch{
        console.log(error);
    }
    toggleSpinner(false);
}


// Display Categories
const displayCategory = catagories =>{
    for(const category of catagories){
        // console.log(category);
    const categoryTray = document.getElementById('category-tray');
    toggleSpinner(true);
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col');
    categoryDiv.innerHTML = `
    <a href="#" onclick="loadCategoryNews('${category.category_id}')" class="btn btn-outline-warning">${category.category_name}</a>
    `;
    categoryTray.appendChild(categoryDiv);
    }
}


// Spinner 
const toggleSpinner = isLoading => {
    const loderSec = document.getElementById('loader');
if(isLoading){
    loderSec.classList.remove('d-none');
}
else{
    loderSec.classList.add('d-none');
}
}

// Load Catagory news 
const loadCategoryNews = async(id)=>{
        try{
            const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            displayCategoryNews(data.data);
        }
        catch{
            console.log(error);
        }
}

// Display category News 
const displayCategoryNews = allNews =>{
    allNews.forEach(news =>{
        // console.log(news);
        const categoryNewsTray = document.getElementById('news-tray');
        categoryNewsTray.textContent = '';
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
        <div class="col-4 text-end btn-border-primary"><a href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Show More <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        </div>
        </div>
        </div>
        `;
        categoryNewsTray.appendChild(categoryNewsDiv);

// Modal 
const modalContainer = document.getElementById('exampleModal');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${news.title ? news.title : 'No Title Found'}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            
            <div class="card-body">
            <p class="card-text">${news.details ? news.details : '<span class="text-warning">No Detail found</span>'}</p>
            </div>
            </div>
            <div class="footer">
            <p>Published on: ${news.author.published_date ? news.author.published_date : '<span class="text-warning">No Publish Date found</span>'}</p>

            <p>Published By (Author): ${news.author.name ? news.author.name : '<span class="text-warning">No Publish Date found</span>'}</p>
            </div>
            <div class="modal-footer">

            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
            </button>
            </div>
          </div>
        </div>
    `;
    });
}

document.getElementById('hot-news').addEventListener('click', function(){
    document.getElementById('blog-article').classList.remove('d-none');
})


loadCategory();