const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchRecipes();
});

async function searchRecipes() {
  const searchValue = searchInput.value.trim();
  if (!searchValue) {
    alert("Please enter a recipe name");
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const data = await response.json();

    if (!data.meals) {
      resultsList.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    displayRecipes(data.meals);
  } catch (error) {
    console.error("Error:", error);
    resultsList.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}

function displayRecipes(recipes) {
  let html = '';
  recipes.forEach((meal) => {
    html += `
      <div>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
        <ul>
          ${getIngredientsList(meal)}
        </ul>
        <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
      </div>
    `;
  });
  resultsList.innerHTML = html;
}

function getIngredientsList(meal) {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients += `<li>${ingredient} - ${measure}</li>`;
    }
  }
  return ingredients;
}
