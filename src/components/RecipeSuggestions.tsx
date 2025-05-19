
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "@/lib/types";
import { Link } from "react-router-dom";

interface RecipeSuggestionsProps {
  foodItems: FoodItem[];
}

const RecipeSuggestions = ({ foodItems }: RecipeSuggestionsProps) => {
  // Filter items that are expiring soon (within 5 days)
  const expiringItems = foodItems.filter((item) => {
    const now = new Date();
    const diffDays = Math.ceil((item.expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 5;
  });

  // Simple recipe suggestions based on expiring items
  const getSuggestions = () => {
    if (expiringItems.length === 0) return [];

    // Very simple mock recipes
    const mockRecipes = [
      {
        title: "Quick Fruit Smoothie",
        ingredients: ["banana", "apple", "milk", "yogurt"],
      },
      {
        title: "Vegetable Stir Fry",
        ingredients: ["broccoli", "carrots", "peppers", "onion"],
      },
      {
        title: "Simple Pasta Dish",
        ingredients: ["pasta", "tomato", "cheese", "garlic"],
      },
      {
        title: "Fresh Salad",
        ingredients: ["lettuce", "cucumber", "tomato", "avocado"],
      },
      {
        title: "Quick Sandwich",
        ingredients: ["bread", "cheese", "lettuce", "ham"],
      },
    ];

    // Very simple matching (just check if item name includes or matches any ingredient)
    return mockRecipes.filter((recipe) => {
      return expiringItems.some((item) => {
        const itemName = item.name.toLowerCase();
        return recipe.ingredients.some(
          (ingredient) => ingredient.includes(itemName) || itemName.includes(ingredient)
        );
      });
    }).slice(0, 3); // Limit to 3 suggestions
  };

  const suggestions = getSuggestions();

  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-dark-green">Recipe Ideas</CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((recipe, index) => (
              <div key={index} className="border-b border-sage/20 last:border-b-0 pb-3 last:pb-0">
                <h4 className="font-medium text-dark-green">{recipe.title}</h4>
                <p className="text-sm text-neutral-gray mt-1">
                  With: {recipe.ingredients.join(", ")}
                </p>
              </div>
            ))}
            
            <Button asChild className="w-full bg-sage/20 hover:bg-sage/30 text-dark-green border-none mt-4">
              <Link to="/dashboard/recipes">
                Find More Recipes
              </Link>
            </Button>
          </div>
        ) : expiringItems.length > 0 ? (
          <div className="text-center py-4">
            <p className="text-neutral-gray">No recipe matches found for your expiring items.</p>
            <Button asChild className="mt-4 bg-sage/20 hover:bg-sage/30 text-dark-green border-none">
              <Link to="/dashboard/recipes">
                Browse All Recipes
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-neutral-gray">Add items to your inventory to get recipe suggestions!</p>
            <Button asChild className="mt-4 bg-sage/20 hover:bg-sage/30 text-dark-green border-none">
              <Link to="/dashboard/recipes">
                Browse Recipes
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeSuggestions;
