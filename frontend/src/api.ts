import fetch from "isomorphic-fetch";

export const searchRecipes = async (searchQuery: string, page: number) => {
  const baseUrl = new URL("http://127.0.0.1:5000/api/recipe/search");
  baseUrl.searchParams.append("searchQuery", searchQuery);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! ${response.status}`);
  }

  return response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://127.0.0.1:5000/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status ${response.status}`);
  }
  return response.json();
};
