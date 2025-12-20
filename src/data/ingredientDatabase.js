// Ingredient database with exact quantities for 2 people
// Each ingredient has: name, quantity for 2 people, category, shelf life

export const ingredientDatabase = {
  // GRAINS & PULSES
  rice_basmati: { name: "Rice (Basmati)", qty: "1 cup", category: "grains", shelfLife: "sunday" },
  rice_sushi: { name: "Sushi Rice", qty: "1 cup", category: "grains", shelfLife: "wednesday" },
  wheat_flour: { name: "Wheat Flour (Atta)", qty: "per roti", category: "grains", shelfLife: "sunday" },
  poha: { name: "Poha", qty: "1 cup", category: "grains", shelfLife: "sunday" },
  upma_rava: { name: "Upma Rava", qty: "3/4 cup", category: "grains", shelfLife: "sunday" },
  oats: { name: "Oats", qty: "1 cup", category: "grains", shelfLife: "sunday" },
  besan: { name: "Besan (Gram Flour)", qty: "1 cup", category: "grains", shelfLife: "sunday" },
  moong_dal: { name: "Moong Dal", qty: "1/2 cup", category: "grains", shelfLife: "sunday" },
  toor_dal: { name: "Toor Dal", qty: "1/2 cup", category: "grains", shelfLife: "sunday" },
  rajma: { name: "Rajma", qty: "3/4 cup", category: "grains", shelfLife: "sunday" },
  chole: { name: "Chole (Chickpeas)", qty: "3/4 cup", category: "grains", shelfLife: "sunday" },
  whole_moong: { name: "Whole Moong (Sprouts)", qty: "1/2 cup", category: "grains", shelfLife: "sunday" },
  dosa_batter: { name: "Dosa/Idli Batter", qty: "2 cups", category: "grains", shelfLife: "sunday" },

  // VEGETABLES - LONG LASTING
  onion: { name: "Onion", qty: "2 medium", category: "vegetables", shelfLife: "sunday" },
  tomato: { name: "Tomato", qty: "3 medium", category: "vegetables", shelfLife: "sunday" },
  potato: { name: "Potato", qty: "3 medium", category: "vegetables", shelfLife: "sunday" },
  ginger: { name: "Ginger", qty: "2 inch piece", category: "vegetables", shelfLife: "sunday" },
  garlic: { name: "Garlic", qty: "8-10 cloves", category: "vegetables", shelfLife: "sunday" },
  green_chili: { name: "Green Chili", qty: "4-5 pieces", category: "vegetables", shelfLife: "sunday" },
  carrot: { name: "Carrot", qty: "2 medium", category: "vegetables", shelfLife: "sunday" },
  capsicum: { name: "Capsicum", qty: "2 medium", category: "vegetables", shelfLife: "sunday" },
  cabbage: { name: "Cabbage", qty: "1/4 medium", category: "vegetables", shelfLife: "sunday" },

  // VEGETABLES - FRESH
  spinach: { name: "Spinach (Palak)", qty: "1 bunch", category: "vegetables", shelfLife: "wednesday" },
  methi: { name: "Methi (Fenugreek)", qty: "1 bunch", category: "vegetables", shelfLife: "wednesday" },
  bhindi: { name: "Bhindi (Okra)", qty: "250g", category: "vegetables", shelfLife: "wednesday" },
  mushroom: { name: "Mushrooms", qty: "200g", category: "vegetables", shelfLife: "wednesday" },
  broccoli: { name: "Broccoli", qty: "1 medium head", category: "vegetables", shelfLife: "wednesday" },
  lettuce: { name: "Lettuce/Mixed Greens", qty: "1 pack", category: "vegetables", shelfLife: "wednesday" },
  cucumber: { name: "Cucumber", qty: "2 medium", category: "vegetables", shelfLife: "wednesday" },
  beetroot: { name: "Beetroot", qty: "2 medium", category: "vegetables", shelfLife: "wednesday" },
  avocado: { name: "Avocado", qty: "1 piece", category: "vegetables", shelfLife: "wednesday" },
  sweet_corn: { name: "Sweet Corn", qty: "1 piece or 1 can", category: "vegetables", shelfLife: "wednesday" },
  spring_onion: { name: "Spring Onion", qty: "1 bunch", category: "vegetables", shelfLife: "wednesday" },
  coriander: { name: "Coriander Leaves", qty: "1 bunch", category: "vegetables", shelfLife: "wednesday" },
  curry_leaves: { name: "Curry Leaves", qty: "1 sprig", category: "vegetables", shelfLife: "wednesday" },
  mint: { name: "Mint Leaves", qty: "1 small bunch", category: "vegetables", shelfLife: "wednesday" },

  // PROTEINS
  chicken_boneless: { name: "Chicken (Boneless)", qty: "300g", category: "proteins", shelfLife: "sunday" },
  chicken_bone: { name: "Chicken (With Bone)", qty: "400g", category: "proteins", shelfLife: "sunday" },
  fish: { name: "Fish", qty: "300g", category: "proteins", shelfLife: "wednesday" },
  paneer: { name: "Paneer", qty: "200g", category: "proteins", shelfLife: "sunday" },
  egg: { name: "Eggs", qty: "2 pieces", category: "proteins", shelfLife: "sunday" },
  tofu: { name: "Tofu", qty: "200g", category: "proteins", shelfLife: "wednesday" },

  // DAIRY
  milk: { name: "Milk", qty: "500ml", category: "dairy", shelfLife: "sunday" },
  curd: { name: "Curd/Yogurt", qty: "200g", category: "dairy", shelfLife: "wednesday" },
  butter: { name: "Butter", qty: "2 tbsp", category: "dairy", shelfLife: "wednesday" },
  cream: { name: "Fresh Cream", qty: "100ml", category: "dairy", shelfLife: "wednesday" },
  cheese: { name: "Cheese", qty: "50g", category: "dairy", shelfLife: "sunday" },

  // FRUITS
  banana: { name: "Banana", qty: "2 pieces", category: "fruits", shelfLife: "wednesday" },
  apple: { name: "Apple", qty: "2 pieces", category: "fruits", shelfLife: "wednesday" },
  orange: { name: "Orange", qty: "2 pieces", category: "fruits", shelfLife: "wednesday" },
  berries: { name: "Berries (Mixed)", qty: "100g", category: "fruits", shelfLife: "wednesday" },
  lemon: { name: "Lemon", qty: "2 pieces", category: "fruits", shelfLife: "wednesday" },

  // PANTRY
  oil: { name: "Cooking Oil", qty: "3 tbsp", category: "pantry", shelfLife: "sunday" },
  ghee: { name: "Ghee", qty: "2 tbsp", category: "pantry", shelfLife: "sunday" },
  salt: { name: "Salt", qty: "to taste", category: "pantry", shelfLife: "sunday" },
  sugar: { name: "Sugar", qty: "1 tbsp", category: "pantry", shelfLife: "sunday" },
  tea: { name: "Tea", qty: "2 cups", category: "pantry", shelfLife: "sunday" },

  // NUTS & SNACKS
  almonds: { name: "Almonds", qty: "10 pieces", category: "snacks", shelfLife: "sunday" },
  cashews: { name: "Cashews", qty: "10 pieces", category: "snacks", shelfLife: "sunday" },
  peanuts: { name: "Peanuts", qty: "2 tbsp", category: "snacks", shelfLife: "sunday" },
  dates: { name: "Dates", qty: "3-4 pieces", category: "snacks", shelfLife: "sunday" },
  roasted_chana: { name: "Roasted Chana", qty: "1/4 cup", category: "snacks", shelfLife: "sunday" },
  makhana: { name: "Makhana", qty: "1/4 cup", category: "snacks", shelfLife: "sunday" },

  // BREAD & PACKAGED
  bread: { name: "Bread", qty: "4 slices", category: "packaged", shelfLife: "sunday" },
  pav: { name: "Pav", qty: "2 pieces", category: "packaged", shelfLife: "sunday" },
  tortilla: { name: "Tortilla/Wrap", qty: "2 pieces", category: "packaged", shelfLife: "sunday" },
  nori: { name: "Nori Sheets", qty: "2 sheets", category: "packaged", shelfLife: "sunday" },

  // SPICES (small quantities, always from pantry)
  turmeric: { name: "Turmeric", qty: "1/2 tsp", category: "spices", shelfLife: "sunday" },
  red_chili: { name: "Red Chili Powder", qty: "1 tsp", category: "spices", shelfLife: "sunday" },
  coriander_powder: { name: "Coriander Powder", qty: "1 tsp", category: "spices", shelfLife: "sunday" },
  cumin: { name: "Cumin Seeds", qty: "1 tsp", category: "spices", shelfLife: "sunday" },
  mustard: { name: "Mustard Seeds", qty: "1/2 tsp", category: "spices", shelfLife: "sunday" },
  garam_masala: { name: "Garam Masala", qty: "1/2 tsp", category: "spices", shelfLife: "sunday" },
  pav_bhaji_masala: { name: "Pav Bhaji Masala", qty: "1 tbsp", category: "spices", shelfLife: "sunday" },

  // CONDIMENTS
  soy_sauce: { name: "Soy Sauce", qty: "1 tbsp", category: "condiments", shelfLife: "sunday" },
  vinegar: { name: "Vinegar", qty: "1 tsp", category: "condiments", shelfLife: "sunday" },
  green_chutney: { name: "Green Chutney", qty: "2 tbsp", category: "condiments", shelfLife: "sunday" },
  tamarind: { name: "Tamarind", qty: "small piece", category: "condiments", shelfLife: "sunday" },
};

// Recipe database - maps each dish to required ingredients
export const recipeDatabase = {
  // BREAKFAST
  "Veg oats + chai": [
    "oats", "milk", "carrot", "onion", "green_chili", "oil", "salt", "tea"
  ],
  "Idli + chai": [
    "dosa_batter", "oil", "mustard", "curry_leaves", "green_chutney", "tea"
  ],
  "Poha + fruit": [
    "poha", "onion", "potato", "peanuts", "curry_leaves", "turmeric", "green_chili", "oil", "lemon", "banana"
  ],
  "Grilled sandwich + chai": [
    "bread", "potato", "onion", "tomato", "butter", "cheese", "green_chutney", "tea"
  ],
  "Besan chilla + chutney": [
    "besan", "onion", "tomato", "green_chili", "coriander", "oil", "green_chutney"
  ],
  "Dosa + sambhar": [
    "dosa_batter", "toor_dal", "tomato", "onion", "carrot", "oil", "mustard", "curry_leaves", "tamarind", "turmeric"
  ],
  "Paratha + curd + chai": [
    "wheat_flour", "potato", "onion", "ghee", "curd", "tea"
  ],
  "Oats bowl + fruit": [
    "oats", "milk", "banana", "apple", "almonds", "dates"
  ],
  "Upma + fruit": [
    "upma_rava", "onion", "green_chili", "peanuts", "curry_leaves", "mustard", "oil", "lemon", "banana"
  ],
  "Omelette + toast + chai": [
    "egg", "onion", "tomato", "green_chili", "bread", "butter", "tea"
  ],
  "Moong dal chilla": [
    "whole_moong", "onion", "tomato", "green_chili", "ginger", "coriander", "oil"
  ],
  "Smoothie bowl": [
    "banana", "berries", "milk", "oats", "almonds"
  ],
  "Dosa / idli": [
    "dosa_batter", "oil", "mustard", "curry_leaves", "green_chutney"
  ],
  "Fruit + chai": [
    "apple", "banana", "tea"
  ],

  // LUNCH
  "2 rotis + dal + veg + salad": [
    "wheat_flour", "toor_dal", "onion", "tomato", "carrot", "cucumber", "oil", "turmeric", "cumin", "garam_masala", "lemon"
  ],
  "Paneer bhurji + roti + salad": [
    "paneer", "wheat_flour", "onion", "tomato", "green_chili", "cucumber", "lettuce", "oil", "turmeric", "cumin"
  ],
  "Rajma chawal + salad": [
    "rajma", "rice_basmati", "onion", "tomato", "ginger", "garlic", "cucumber", "oil", "turmeric", "red_chili", "garam_masala"
  ],
  "Chicken wrap": [
    "chicken_boneless", "tortilla", "lettuce", "tomato", "onion", "cucumber", "green_chutney", "oil"
  ],
  "Bhindi + dal + roti": [
    "bhindi", "toor_dal", "wheat_flour", "onion", "tomato", "oil", "turmeric", "cumin"
  ],
  "Sushi bowl": [
    "rice_sushi", "nori", "avocado", "cucumber", "carrot", "soy_sauce", "tofu"
  ],
  "Methi chicken + roti + salad": [
    "chicken_boneless", "methi", "wheat_flour", "onion", "tomato", "cucumber", "ginger", "garlic", "oil", "turmeric", "garam_masala"
  ],
  "Subway 6-inch": [
    "bread", "lettuce", "tomato", "cucumber", "onion", "cheese", "green_chutney"
  ],
  "Chole chawal": [
    "chole", "rice_basmati", "onion", "tomato", "ginger", "garlic", "oil", "turmeric", "garam_masala", "tea"
  ],
  "Buddha bowl": [
    "rice_basmati", "broccoli", "lettuce", "avocado", "beetroot", "tofu", "lemon", "oil"
  ],
  "Curd rice": [
    "rice_basmati", "curd", "cucumber", "carrot", "mustard", "curry_leaves", "green_chili"
  ],
  "Asian rice + chicken": [
    "rice_basmati", "chicken_boneless", "capsicum", "carrot", "spring_onion", "soy_sauce", "ginger", "garlic", "oil"
  ],
  "Veg + dal + roti": [
    "wheat_flour", "toor_dal", "onion", "tomato", "carrot", "potato", "oil", "turmeric", "cumin"
  ],
  "Light roti sabzi": [
    "wheat_flour", "onion", "tomato", "carrot", "oil", "turmeric", "cumin"
  ],

  // DINNER
  "Chicken curry + veg + 1 roti": [
    "chicken_bone", "wheat_flour", "onion", "tomato", "ginger", "garlic", "carrot", "oil", "turmeric", "red_chili", "garam_masala"
  ],
  "California burrito bowl": [
    "rice_basmati", "chicken_boneless", "lettuce", "tomato", "avocado", "sweet_corn", "cheese", "tortilla"
  ],
  "Mushroom masala + roti": [
    "mushroom", "wheat_flour", "onion", "tomato", "cream", "oil", "garam_masala", "butter"
  ],
  "Chinese stir fry chicken + veg": [
    "chicken_boneless", "capsicum", "carrot", "cabbage", "spring_onion", "soy_sauce", "vinegar", "ginger", "garlic", "oil"
  ],
  "Paneer shahi + roti": [
    "paneer", "wheat_flour", "onion", "tomato", "cream", "cashews", "oil", "garam_masala", "butter"
  ],
  "Lemon rice + curd": [
    "rice_basmati", "curd", "lemon", "peanuts", "curry_leaves", "turmeric", "mustard", "green_chili"
  ],
  "Sprouts stir fry": [
    "whole_moong", "onion", "tomato", "carrot", "capsicum", "lemon", "oil", "cumin"
  ],
  "Soup + grilled protein": [
    "chicken_boneless", "carrot", "onion", "tomato", "mushroom", "oil", "salt"
  ],
  "Chicken tikka + veg": [
    "chicken_boneless", "curd", "ginger", "garlic", "carrot", "capsicum", "lemon", "garam_masala", "oil"
  ],
  "Fish & chips (shared)": [
    "fish", "potato", "bread", "lemon", "oil"
  ],
  "Pav bhaji - 1 pav": [
    "potato", "tomato", "onion", "capsicum", "carrot", "pav", "butter", "pav_bhaji_masala", "lemon"
  ],
  "Thin crust pizza (shared)": [
    "bread", "tomato", "cheese", "capsicum", "onion", "mushroom"
  ],
  "Paneer / chicken dish": [
    "paneer", "chicken_boneless", "onion", "tomato", "ginger", "garlic", "oil", "turmeric", "garam_masala"
  ],
  "Sushi / Chinese / Burrito": [
    "rice_sushi", "chicken_boneless", "nori", "avocado", "cucumber", "soy_sauce", "tortilla", "lettuce"
  ],

  // SNACKS
  "Fruit + nuts": [
    "apple", "banana", "almonds", "cashews"
  ],
  "Chana / makhana": [
    "roasted_chana", "makhana"
  ],
};
