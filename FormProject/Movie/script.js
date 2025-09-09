const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const movieContainer = document.querySelector(".movie-container");



    async function fetchMovie(query) {
        
        try {
      movieContainer.innerHTML = "<h1> Fetching your favorite movie or tv show from database... </h1>"
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const movies = await response.json();
        movieContainer.innerHTML = ""
        makeMovies(movies)

        console.log(movies);
              
    } catch (error) {
            movieContainer.innerHTML = "<h1> You entered the wrong movie name.. Try again!! </h1>"
    }
    }
    
    
    function makeMovies(movies){
      
        movies.forEach(movie => {

            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movieList");

             movieDiv.innerHTML = `
             <img src="${movie.show.image.medium}"/>
             <p><span> ${movie.show.name} </span></p>
             <h3>${movie.show.language}</h3>
               <p>${movie.show.summary}</p>
             `
            movieContainer.appendChild(movieDiv)
    });
    }

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
  const search = searchBox.value.trim();
  if (!search) {
    movieContainer.innerHTML = "<h1> Sorry!! <br> Something went wrong </h1>";
    return
  }
  fetchMovie(search)
  searchBox.value = ""
});

// const APIKey= "bd2ae01";
// const getData = async() => {
// // const APIKey= "bd2ae01";
//     let response = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t="pk"`);
//     let data = await response.json();
//     console.log(data);
    
// }
// getData()
