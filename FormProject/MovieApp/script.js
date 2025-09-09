const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const movieContainer = document.querySelector(".movie-container");


async function fetchMovie(query) {
    try {
  
    movieContainer.innerHTML = "<h1> Fetching your favorite tv Show from database....";
    const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    const movies = await req.json();
    movieContainer.innerHTML = "";
    
    makeMovies(movies);

    console.log(movies);
          
} catch (error) {
        movieContainer.innerHTML = "<h1>Sorry!!. <br> You entered the wrong movie name...</h1>"
        movieContainer.parentElement.style.color = "red";
}
    
}
    function makeMovies(movies) {
        for(let movie of movies){
            let src = movie.show.image.medium
            const img = document.createElement("img");

            img.src=src;

            movieContainer.appendChild(img)
        }
    }



searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const search = searchBox.value.trim();
    if(!search){
        movieContainer.innerHTML = "<h1> Sorry!!!. <br> Your searchBox is empty.... </h1>";
        movieContainer.parentElement.style.color = "red";
        return
    }
    fetchMovie(search)
    searchBox.value = ""
});