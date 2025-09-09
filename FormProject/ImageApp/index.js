  const accessKey = "aEfn8IKe4XkMecE4Sir8r2Y2Ocv6_mlvfODHH2RCacs";

const searchForm = document.querySelector("form");
const imageContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input")
const loadMoreBtn = document.querySelector(".loadMoreBtn");
const closeBtn = document.querySelector(".closeBtn");
const imageDetailsContent = document.querySelector(".image-details-content")
let page = 1;

    const key = "RuJTeKhXAyF9G-9VlCJJv1NlEMuCgGCDgIS-2Brjv3E";
    async function fetchImages(query, pageNo) {
        try {
     
      if (pageNo == 1) {
        imageContainer.innerHTML = "<h1>Fetching your favorite Picture from database....";
      }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${key}` //else
        // const url = "https://api.unsplash.com/search/photos?per_page=28&query="   
        // let response = await fetch(url + query  + `&client_id=${key}`);
        let response = await fetch(url)
        let data = await response.json()
        if(data.results.length > 0){
        imageContainer.innerHTML = "";
        data.results.forEach(photo => {
          
          const imageElement = document.createElement("div");
          imageElement.classList.add("imageDiv");
          imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

          // popup theme
          // const button = document.createElement("button");
          // button.classList.add("popupButton")
          // imageContainer.appendChild(button)
          //popup theme
          const overlayElement = document.createElement("div");
          overlayElement.classList.add("overlay");
          
          // creating overlay Element
          imageElement.appendChild(overlayElement)
          // creating overlay text
          const overlayText = document.createElement("h3")
          overlayText.innerText = `${photo.alt_description}`;
          overlayElement.appendChild(overlayText)
           console.log(data)


           imageElement.addEventListener("click", ()=>{
            popupImage(photo)
        })

        imageContainer.appendChild(imageElement);
        
        });
        if(data.total_pages === pageNo){
            loadMoreBtn.style.display = "none";
        }else{
          loadMoreBtn.style.display = "block";
        }
    }else{
      imageContainer.innerHTML = "<h1>No image found...</h1>"
    }
    // popup image
   
    // popup images
         
  } catch (error) {
          imageContainer.innerHTML = "<h1> Sorry!!. <br> Something went wrong </h1>";
  }
  }

  const popupImage = (photo) =>{
      imageDetailsContent.innerHTML = `<img class="cover" src=${photo.urls.regular}/>`;
      imageDetailsContent.parentElement.style.display = "block"
  }


  closeBtn.addEventListener("click", () =>{
    imageDetailsContent.parentElement.style.display = "none";
  });

 
searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
      const inputText = searchInput.value.trim();
      if (inputText !== "") {
       page = 1;
        fetchImages(inputText, page)
        
      }
      else{
        imageContainer.innerHTML = "<h1>Please enter a search query...</h1>"
        if (loadMoreBtn.style.display === "block") {
          loadMoreBtn.style.display === "none";
        }
      }
      searchInput.value = "";
})

// Adding event Listener to load more button to fetch more images
loadMoreBtn.addEventListener("click", () =>{

    fetchImages(searchInput.value.trim(), ++page)
});