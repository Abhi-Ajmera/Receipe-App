let box = document.querySelector("#box");
let serachBtn = document.querySelector("#searchBtn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

serachBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let element = document.querySelector("#element");
  let input = document.getElementById("input").value;

  if (input == "") {
    element.innerHTML = "Search is Empty";
    setTimeout(() => {
      element.remove();
    }, 5000);
  } else {
    fetch(url + input)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals == null) {
          element.innerHTML = "Invalid or Doesn't exist in database";
          setTimeout(() => {
            element.remove();
          }, 5000);
        } else {
          let meal = data.meals[0];
          let ingredients = [];
          let measure = [];
          let total = [];
          for (let i in meal) {
            if (i.startsWith("strMeasure") && meal[i]) {
              if (meal[i] == " ") {
                continue;
              }
              measure.push(meal[i]);
            }
            if (i.startsWith("strIngredient") && meal[i]) {
              ingredients.push(meal[i]);
            }
          }
          for (let x = 0; x < ingredients.length; x++) {
            total.push(measure[x] + " of " + ingredients[x] + " ");
          }

          element.innerHTML = `<div class="container mt-4 mb-1 text-center">
          <img src="${meal.strMealThumb}" width="80%">
          </div>
          <div class="container pt-2 bg-warning text-center">
          <h4 class="heading">${meal.strMeal}</h4>
          <p>${meal.strArea}</p>
          </div>
          <div class="container">
          <p><b>Ingredients Required -</b><br>${total}</p>
          </div>
          <div class="container">
          <p><b>Instructions to Make -</b><br> ${meal.strInstructions}`;
          box.appendChild(element);
        }
      });
  }
});
