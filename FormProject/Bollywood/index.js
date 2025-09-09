const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const movieContainer = document.querySelector(".movie-container");

const api_key = "bd2ae01";
const getMovie = async (movieName) =>{
    const response = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&t=${movieName}`);
    const data = await response.json();

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movieList");
    
    movieDiv.innerHTML = `
    <img src="${data.Poster}"/>
     <h1 class="title">${data.Title}</h1>
     <p>Ratings: <span>${data.Ratings[0].Value}</span></p>
    <p><b>Genre: <span>${data.Genre}</span></b></p>
        <p>Released: <span>${data.Released}</span></p>
        <p>Duration: <span>${data.Runtime}</span></p>
        <h4>Description: <span>${data.Plot}</span></h4>
    `
    // const movieData = document.createElement("div");
    // movieData.classList.add("movieName");
    // movieData.innerHTML = `
    //  <h1 class="title">${data.Title}</h1>
    // `
    movieContainer.appendChild(movieDiv)
 

    console.log(data);
    
}


searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        movieContainer.innerHTML = "<h1>Your searchBox is empty... Try again.</h1>";
        return
    }
    getMovie(searchInput);
    searchBox.value = "";
})