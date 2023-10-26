import React, { FormEvent, useRef } from "react";
import "./App.css";
import * as api from "./api.js";
import { Recipe } from "./types.js";
import RecipeCard from "./components/RecipeCard.js";
import RecipeSummary from "./components/RecipeSummary.js";

type Tabs = "search" | "favourites";

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState<
    Recipe | undefined
  >(undefined);
  const [selectedTab, setSelectedTab] = React.useState<Tabs>("search");
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
        <div className="tabs">
          <h1 onClick={() => setSelectedTab("search")}> Recipe Search </h1>
          <h1 onClick={() => setSelectedTab("favourites")}> Favourites </h1>
        </div>
        {selectedTab === "search" && (
          <>
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
              <RecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
            </button>
          </>
        )}

        {selectedTab === "favourites" && <div>This is the favourites tab</div>}

        {selectedRecipe ? (
          <RecipeSummary
            recipeId={selectedRecipe.id.toString()}
            onClose={() => setSelectedRecipe(undefined)}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
