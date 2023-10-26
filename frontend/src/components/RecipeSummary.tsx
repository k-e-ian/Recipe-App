import React from "react";
import { getRecipeSummary } from "../api";
import { RecipeSummary } from "../types";

interface Props {
  recipeId: string;
  onClose: () => void;
}
const RecipeSummary = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = React.useState<RecipeSummary>();

  React.useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summmaryRecipe = await getRecipeSummary(recipeId);
        setRecipeSummary(summmaryRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);
  if (!recipeSummary) {
    return <></>;
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="summary">
        <div className="summary-content">
          <div className="summary-header">
            <h2>{recipeSummary.title}</h2>
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: recipeSummary?.summary,
            }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default RecipeSummary;
