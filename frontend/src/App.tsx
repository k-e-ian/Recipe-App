import React, { FormEvent, useRef } from "react";
import "./App.css";
import * as api from "./api.js";
import { Recipe } from "./types.js";
import RecipeCard from "./components/RecipeCard.js";

function App() {
  const [searchQuery, setSearchQuery] = React.useState("burgers");
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchQuery, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;

    try {
      const nextRecipes = await api.searchRecipes(searchQuery, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={(event) => handleSearchSubmit(event)}>
          <input
            type="text"
            required
            placeholder="Enter a search ..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
        <button className="view-more-button" onClick={handleViewMoreClick}>
          View More
        </button>
      </div>
    </>
  );
}

export default App;
