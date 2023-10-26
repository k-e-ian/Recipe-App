export interface Recipe {
  map(
    arg0: (recipe: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface RecipeSummary {
  id: number;
  title: string;
  summary: string;
}
