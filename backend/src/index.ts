import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req, res) => {
  // GET localhost/api/recipes/search?searchQuery=burgers&page=1
  const searchQuery = req.query.searchQuery as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchQuery, page);
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recepeId = req.params.recipeId;
  const results = await RecipeAPI.getRecipeSummary(recepeId);
  return res.json(results);
});

app.listen(5000, () => {
  console.log("Server running on localhost");
});
