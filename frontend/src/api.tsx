import fetch from "isomorphic-fetch";
import { Recipe } from "./types";

export const searchRecipes = async (searchQuery: string, page: number) => {
  const baseUrl = new URL("https://spoonfed.onrender.com/api/recipe/search");
  baseUrl.searchParams.append("searchQuery", searchQuery);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! ${response.status}`);
  }

  return response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(
    `https://spoonfed.onrender.com/api/recipes/${recipeId}/summary`
  );
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status ${response.status}`);
  }
  return response.json();
};

export const getFavouriteRecipes = async () => {
  const url = new URL("https://spoonfed.onrender.com/api/recipes/favourite");
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status ${response.status}`);
  }
  return response.json();
};

export const addFavouriteRecipes = async (recipe: Recipe) => {
  const url = new URL("https://spoonfed.onrender.com/api/recipes/favourite");
  const body = {
    recipeId: recipe.id,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status ${response.status}`);
  }
};

export const removeFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("https://spoonfed.onrender.com/api/recipes/favourite");
  const body = {
    recipeId: recipe.id,
  };
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status ${response.status}`);
  }
};
