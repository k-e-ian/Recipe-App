import { Recipe } from "../types.js";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
  isFavourite: boolean;
}
const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavourite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img className="card--img" src={recipe.image} alt="recipe img" />
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        >
          {isFavourite ? (
            <AiFillHeart size={18} color={"red"} />
          ) : (
            <AiOutlineHeart size={18} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
