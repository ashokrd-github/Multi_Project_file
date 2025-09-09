const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");


const fetchFood = async (query) =>{
    recipeContainer.innerHTML = `<h1>Fetching food from database....</h1>`;
    try {
        
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    var data = await response.json();
    recipeContainer.innerHTML = "";

    data.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span> ${meal.strArea} </span> Dish </p>
        <p>Belongs to <span> ${meal.strCategory} </span> Category </p>`;


     const button = document.createElement("button");
         button.textContent = "View Recipe";
         recipeDiv.appendChild(button);
          

        //  Adding button clickListener to recipe button
        button.addEventListener("click", () =>{
            openRecipePopup(meal);
        });


        recipeContainer.appendChild(recipeDiv);
    });
    // console.log(data.meals[0]);
} catch (error) {
    recipeContainer.innerHTML = `<h1> Something went wrong 😒😒😒 Try again!!`
        
}
}

// Fetch the ingredients material in javaScript
const fetchIngredient = (meal) =>{
   let ingredientList = "";
   for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`]
        ingredientList += `<li>${measure} ${ingredient}</li>`
    }else{
        break;
    }

   }
   return ingredientList;
}

//  Open the dialog box in javaScript language
const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName" > ${meal.strMeal}  </h2>
    <h3>Ingredients: </h3>
    <ul class="ingredientList">${fetchIngredient(meal)}</ul>

    <div>
        <h3> Instructions: </h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", () =>{
    recipeDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h1>If you want to search meals. Write the something in searchBox`
        return
    }
    fetchFood(searchInput);
});