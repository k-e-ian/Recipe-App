require("dotenv").config();
import fetch from "isomorphic-fetch";
const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchQuery: string, page: number) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchQuery,
    number: "10",
    offset: (page * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();
  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const params = {
    apiKey,
  };
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const json = await response.json();

  return json;
};