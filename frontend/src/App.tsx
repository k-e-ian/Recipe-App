import React, { FormEvent, useRef } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import Hero from "./components/Hero";
import Header from "./components/Header";
import RecipeSummary from "./components/RecipeSummary";
import { AiOutlineSearch } from "react-icons/ai";
import Footer from "./components/Footer";
type Tabs = "search" | "favourites";

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState<
    Recipe | undefined
  >(undefined);
  const [selectedTab, setSelectedTab] = React.useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = React.useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  React.useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFavouriteRecipes();
  }, []);

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

  const addFavouriteRecipes = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipes(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (e) {
      console.log(e);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Hero />
        <div className="tabs">
          <h1
            className={selectedTab === "search" ? "tab-active" : ""}
            onClick={() => setSelectedTab("search")}
          >
            {" "}
            Recipe Search{" "}
          </h1>
          <h1
            className={selectedTab === "favourites" ? "tab-active" : ""}
            onClick={() => setSelectedTab("favourites")}
          >
            {" "}
            Favourites{" "}
          </h1>
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
              <button type="submit">
                <AiOutlineSearch size={20} />
              </button>
            </form>
            <div className="recipe-grid">
              {recipes.map((recipe, index) => {
                const isFavourite = favouriteRecipes.some(
                  (favRecipe) => recipe.id === favRecipe.id
                );
                return (
                  <RecipeCard
                    key={index}
                    recipe={recipe}
                    onClick={() => {
                      return setSelectedRecipe(recipe);
                    }}
                    onFavouriteButtonClick={
                      isFavourite ? removeFavouriteRecipe : addFavouriteRecipes
                    }
                    isFavourite={isFavourite}
                  />
                );
              })}
            </div>

            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
            </button>
          </>
        )}

        {selectedTab === "favourites" && (
          <div className="recipe-grid">
            {favouriteRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavouriteButtonClick={removeFavouriteRecipe}
                isFavourite={true}
              />
            ))}
          </div>
        )}

        {selectedRecipe ? (
          <RecipeSummary
            recipeId={selectedRecipe.id.toString()}
            onClose={() => setSelectedRecipe(undefined)}
          />
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default App;
