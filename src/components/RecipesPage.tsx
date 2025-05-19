
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/lib/types";

interface RecipesPageProps {
  foodItems: FoodItem[];
}

const RecipesPage = ({ foodItems }: RecipesPageProps) => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState<{title: string, ingredients: string[], instructions: string}[]>([]);
  
  // Mock recipe database
  const mockRecipes = [
    {
      title: "Pasta Primavera",
      ingredients: ["pasta", "tomatoes", "zucchini", "bell peppers", "olive oil", "garlic"],
      instructions: "1. Cook pasta according to package. 2. Sauté vegetables with garlic. 3. Combine and serve with olive oil and herbs."
    },
    {
      title: "Vegetable Stir Fry",
      ingredients: ["rice", "carrots", "broccoli", "soy sauce", "garlic", "ginger"],
      instructions: "1. Cook rice. 2. Stir fry vegetables with garlic and ginger. 3. Add soy sauce and serve over rice."
    },
    {
      title: "Apple Crumble",
      ingredients: ["apples", "sugar", "flour", "butter", "cinnamon"],
      instructions: "1. Slice apples and mix with sugar and cinnamon. 2. Make crumble topping with flour, sugar and butter. 3. Bake until golden."
    },
    {
      title: "Chicken Salad",
      ingredients: ["chicken", "lettuce", "tomatoes", "cucumber", "olive oil"],
      instructions: "1. Cook chicken. 2. Chop vegetables. 3. Combine and drizzle with olive oil and seasonings."
    },
    {
      title: "Banana Smoothie",
      ingredients: ["bananas", "milk", "yogurt", "honey"],
      instructions: "1. Combine all ingredients. 2. Blend until smooth."
    }
  ];
  
  // Find recipes based on ingredient or food items
  const findRecipes = () => {
    const inputIngredient = ingredient.toLowerCase().trim();
    const foodItemNames = foodItems.map(item => item.name.toLowerCase());
    
    const matchedRecipes = mockRecipes.filter(recipe => {
      // Match the input ingredient
      if (inputIngredient && recipe.ingredients.some(ing => ing.includes(inputIngredient))) {
        return true;
      }
      
      // Match any food items in inventory
      if (recipe.ingredients.some(ing => foodItemNames.some(food => ing.includes(food) || food.includes(ing)))) {
        return true;
      }
      
      return false;
    });
    
    setRecipes(matchedRecipes);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark-green">Recipe Suggestions</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Enter an ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="flex-grow"
        />
        <Button 
          onClick={findRecipes}
          className="bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green"
        >
          Find Recipes
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-medium text-dark-green mb-2">Based on your inventory</h2>
        <div className="flex flex-wrap gap-2">
          {foodItems.map((item) => (
            <span 
              key={item.id}
              className="bg-sage/30 text-dark-green px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => {
                setIngredient(item.name);
                findRecipes();
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <Card key={index} className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-dark-green mb-2">{recipe.title}</h3>
              <div className="mb-4">
                <h4 className="font-medium text-neutral-gray">Ingredients:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recipe.ingredients.map((ing, i) => (
                    <span key={i} className="bg-sage/20 text-dark-green px-2 py-1 rounded-full text-sm">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-neutral-gray">Instructions:</h4>
                <p className="text-neutral-gray mt-1">{recipe.instructions}</p>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-neutral-gray">
            <p>Enter an ingredient or select one from your inventory to find matching recipes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
