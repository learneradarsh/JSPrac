const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const transformRecipeResponseFormat = (data)=>{
    return {
        id: data.id,
        sourceUrl: data.source_url,
        image: data.image_url,
        title: data.title,
        cookingTime: data.cooking_time,
        publisher: data.publisher,
        ingredients: data.ingredients,
        servings: data.servings
    };
};
getRecipeFromAPI(); // https://forkify-api.herokuapp.com/v2
 ///////////////////////////////////////

//# sourceMappingURL=index.62406edb.js.map
