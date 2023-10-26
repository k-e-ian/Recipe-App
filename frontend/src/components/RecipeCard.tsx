import { Recipe } from "../types.js";

interface Props {
  recipe: Recipe;
  onClick: () => void;
}
const RecipeCard = ({ recipe, onClick }: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="recipe img" />
      <div className="recipe-card-title">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
