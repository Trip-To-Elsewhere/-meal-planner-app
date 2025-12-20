import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { recipeDatabase, ingredientDatabase } from '../data/ingredientDatabase';
import { dayNames } from '../data/mealPlanData';

function IngredientViewer({ selectedMeals, onBack, onGenerateLists }) {
  // Calculate all unique ingredients needed
  const calculateIngredients = () => {
    const ingredientCounts = {};
    const mealIngredientMap = {};

    // Process each selected meal
    dayNames.forEach(day => {
      const dayMeals = selectedMeals[day];
      if (!dayMeals) return;

      Object.entries(dayMeals).forEach(([mealType, mealName]) => {
        const ingredients = recipeDatabase[mealName];

        if (ingredients) {
          // Track which meals use which ingredients
          if (!mealIngredientMap[mealName]) {
            mealIngredientMap[mealName] = [];
          }

          ingredients.forEach(ingredientKey => {
            const ingredient = ingredientDatabase[ingredientKey];
            if (ingredient) {
              // Count ingredient occurrences
              if (!ingredientCounts[ingredientKey]) {
                ingredientCounts[ingredientKey] = {
                  ...ingredient,
                  count: 0,
                  usedIn: []
                };
              }
              ingredientCounts[ingredientKey].count += 1;

              if (!ingredientCounts[ingredientKey].usedIn.includes(mealName)) {
                ingredientCounts[ingredientKey].usedIn.push(mealName);
              }

              mealIngredientMap[mealName].push(ingredientKey);
            }
          });
        }
      });
    });

    return { ingredientCounts, mealIngredientMap };
  };

  const { ingredientCounts, mealIngredientMap } = calculateIngredients();

  // Group meals by ingredient
  const getMealsByIngredient = () => {
    const mealList = [];

    dayNames.forEach(day => {
      const dayMeals = selectedMeals[day];
      if (!dayMeals) return;

      Object.entries(dayMeals).forEach(([mealType, mealName]) => {
        if (!mealList.find(m => m.name === mealName)) {
          mealList.push({
            name: mealName,
            ingredients: mealIngredientMap[mealName] || [],
            type: mealType
          });
        }
      });
    });

    return mealList;
  };

  const mealsList = getMealsByIngredient();

  // Group ingredients by category
  const groupedIngredients = {};
  Object.entries(ingredientCounts).forEach(([key, ingredient]) => {
    const category = ingredient.category;
    if (!groupedIngredients[category]) {
      groupedIngredients[category] = [];
    }
    groupedIngredients[category].push({ key, ...ingredient });
  });

  const categoryLabels = {
    vegetables: '🥬 Vegetables',
    grains: '🌾 Grains & Pulses',
    proteins: '🍗 Proteins',
    dairy: '🥛 Dairy',
    fruits: '🍎 Fruits',
    pantry: '🧴 Pantry',
    snacks: '🥜 Nuts & Snacks',
    packaged: '📦 Packaged',
    spices: '🌶️ Spices',
    condiments: '🍯 Condiments'
  };

  const totalIngredients = Object.keys(ingredientCounts).length;
  const totalMeals = mealsList.length;

  return (
    <div className="ingredient-viewer">
      <div className="viewer-header">
        <h2>Review Your Ingredients</h2>
        <p>Here's what you'll need for your {totalMeals} selected meals</p>

        <div className="summary-cards">
          <div className="summary-card">
            <Package size={24} />
            <div>
              <span className="summary-number">{totalIngredients}</span>
              <span className="summary-label">Total Ingredients</span>
            </div>
          </div>
          <div className="summary-card">
            <Package size={24} />
            <div>
              <span className="summary-number">{totalMeals}</span>
              <span className="summary-label">Unique Dishes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredient Categories */}
      <div className="ingredients-section">
        <h3>Ingredients by Category</h3>
        <div className="categories-grid">
          {Object.entries(groupedIngredients).map(([category, ingredients]) => (
            <div key={category} className="ingredient-category">
              <h4>{categoryLabels[category] || category}</h4>
              <ul className="ingredient-list">
                {ingredients.map(ingredient => (
                  <li key={ingredient.key} className="ingredient-item">
                    <span className="ingredient-name">{ingredient.name}</span>
                    <span className="ingredient-qty">
                      {ingredient.qty} × {ingredient.count} {ingredient.count > 1 ? 'times' : 'time'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Meals with Ingredients */}
      <div className="meals-section">
        <h3>Meals → Ingredients Mapping</h3>
        <div className="meals-grid">
          {mealsList.map((meal, idx) => (
            <div key={idx} className="meal-card">
              <h4>{meal.name}</h4>
              <span className="meal-type-badge">{meal.type}</span>
              <ul className="meal-ingredients">
                {meal.ingredients.map(ingredientKey => {
                  const ingredient = ingredientDatabase[ingredientKey];
                  return ingredient ? (
                    <li key={ingredientKey}>
                      {ingredient.name} ({ingredient.qty})
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="viewer-footer">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
          Back to Meal Selection
        </button>
        <button className="generate-btn" onClick={onGenerateLists}>
          Generate Shopping Lists
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default IngredientViewer;
