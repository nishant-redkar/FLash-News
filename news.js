
// let apikey = '72837181327d4d288cbdd8c217671349';

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');


function sendCategory(category) {
  




 // Create a ajax get request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=72837181327d4d288cbdd8c217671349`, true);

  // What to do when response is ready
  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      // console.log(articles);
      let newsHtml = "";
      articles.forEach(function (element) {
        let news = `<div class="card">
        <div class="card-header" id="headingOne">
        <h2 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne" onclick="window.open('${element["url"]}', '_blank')">
                ${element["title"]}
            </button>
        </h2>
    </div>
    

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
        <div class="row">
        <div class="col-md-4">
            <img src="${element.urlToImage}" alt="${element.title}" class="img-fluid">
        </div>
        <div class="col-md-8">
            <p>${element.description}</p>
            <a href="${element.url}" target="_blank" class="btn btn-primary">Read more</a>
        </div>
    </div>
</div>`
        newsHtml += news;
      });

      newsAccordion.innerHTML = newsHtml;
    } else {
      console.log("Some error occured")
    }

  }

  // Send the request
  xhr.send();

}

sendCategory('general');

const homeLink = document.getElementById('home-link');

homeLink.addEventListener('click', function () {
  sendCategory('general');
});



const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form submission
  
  const searchQuery = searchInput.value;
  sendSearchQuery(searchQuery);
  searchInput.value = "";
});





function sendSearchQuery(query) {
  




  // Create a ajax get request
   const xhr = new XMLHttpRequest();
   xhr.open('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=72837181327d4d288cbdd8c217671349`, true);
 
   // What to do when response is ready
   xhr.onload = function () {
     if (this.status === 200) {
       let json = JSON.parse(this.responseText);
       let articles = json.articles;
       // console.log(articles);
       let newsHtml = "";
       articles.forEach(function (element) {
         let news = `<div class="card">
         <div class="card-header" id="headingOne">
         <h2 class="mb-0">
             <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                 aria-expanded="true" aria-controls="collapseOne" onclick="window.open('${element["url"]}', '_blank')">
                 ${element["title"]}
             </button>
         </h2>
     </div>
 
     <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
         <div class="card-body">
         <div class="row">
         <div class="col-md-4">
             <img src="${element.urlToImage}" alt="${element.title}" class="img-fluid">
         </div>
         <div class="col-md-8">
             <p>${element.description}</p>
             <a href="${element.url}" target="_blank" class="btn btn-primary">Read more</a>
         </div>
     </div>
 </div>`
         newsHtml += news;
       });
 
       newsAccordion.innerHTML = newsHtml;
     } else {
       console.log("Some error occured")
     }
 
   }
 
   // Send the request
   xhr.send();
 
 }