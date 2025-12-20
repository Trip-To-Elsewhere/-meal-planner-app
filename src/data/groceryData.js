export const groceryData = {
  sunday: {
    title: "Sunday Order",
    subtitle: "Main Weekly Grocery - Long-lasting items",
    emoji: "🛒",
    categories: [
      {
        name: "Grains & Pulses",
        icon: "🌾",
        items: [
          { id: "rice", name: "Rice (Basmati)", quantity: "2 kg" },
          { id: "wheat_flour", name: "Wheat flour (atta)", quantity: "2 kg" },
          { id: "poha", name: "Poha (flattened rice)", quantity: "500g" },
          { id: "oats", name: "Oats (rolled)", quantity: "1 kg" },
          { id: "upma_rava", name: "Upma rava/semolina", quantity: "500g" },
          { id: "dosa_batter", name: "Dosa/Idli batter", quantity: "1 kg" },
          { id: "rice_flour", name: "Rice flour", quantity: "250g" },
          { id: "besan", name: "Besan (gram flour)", quantity: "500g" },
          { id: "moong_dal", name: "Moong dal (yellow)", quantity: "500g" },
          { id: "toor_dal", name: "Toor dal (arhar)", quantity: "500g" },
          { id: "rajma", name: "Rajma (kidney beans)", quantity: "500g" },
          { id: "chole", name: "Chole (chickpeas)", quantity: "500g" },
          { id: "whole_moong", name: "Whole moong (for sprouts)", quantity: "300g" }
        ]
      },
      {
        name: "Vegetables (Long-Lasting)",
        icon: "🥔",
        items: [
          { id: "onions", name: "Onions", quantity: "2 kg" },
          { id: "potatoes", name: "Potatoes", quantity: "1.5 kg" },
          { id: "tomatoes", name: "Tomatoes", quantity: "2 kg" },
          { id: "ginger", name: "Ginger", quantity: "200g" },
          { id: "garlic", name: "Garlic", quantity: "200g" },
          { id: "green_chilies", name: "Green chilies", quantity: "100g" },
          { id: "carrots", name: "Carrots", quantity: "1 kg" },
          { id: "capsicum", name: "Capsicum/Bell peppers", quantity: "6-8 pieces" },
          { id: "cabbage", name: "Cabbage", quantity: "1 medium" }
        ]
      },
      {
        name: "Proteins (Frozen/Long-Lasting)",
        icon: "🍗",
        items: [
          { id: "chicken_boneless", name: "Chicken (boneless)", quantity: "1.5 kg" },
          { id: "chicken_bone", name: "Chicken (with bone)", quantity: "1 kg" },
          { id: "fish", name: "Fish", quantity: "500g" },
          { id: "paneer", name: "Paneer", quantity: "1 kg" },
          { id: "eggs", name: "Eggs", quantity: "2 dozen" },
          { id: "tofu", name: "Tofu", quantity: "400g" }
        ]
      },
      {
        name: "Pantry Staples",
        icon: "🧴",
        items: [
          { id: "oil", name: "Cooking oil", quantity: "1 liter" },
          { id: "ghee", name: "Ghee", quantity: "500g" },
          { id: "tea", name: "Tea powder/bags", quantity: "200g or 1 box" },
          { id: "sugar", name: "Sugar", quantity: "500g" },
          { id: "salt", name: "Salt", quantity: "1 kg" },
          { id: "jaggery", name: "Jaggery", quantity: "250g" },
          { id: "peanuts", name: "Peanuts/cashews", quantity: "500g" },
          { id: "almonds", name: "Almonds", quantity: "250g" },
          { id: "makhana", name: "Makhana (fox nuts)", quantity: "200g" },
          { id: "chana", name: "Roasted chana", quantity: "300g" }
        ]
      },
      {
        name: "Spices & Condiments",
        icon: "🌶️",
        items: [
          { id: "turmeric", name: "Turmeric powder", quantity: "100g" },
          { id: "chili", name: "Red chili powder", quantity: "100g" },
          { id: "coriander_pwd", name: "Coriander powder", quantity: "100g" },
          { id: "cumin", name: "Cumin seeds", quantity: "100g" },
          { id: "mustard", name: "Mustard seeds", quantity: "50g" },
          { id: "garam_masala", name: "Garam masala", quantity: "100g" },
          { id: "pav_bhaji_masala", name: "Pav bhaji masala", quantity: "100g" },
          { id: "soy_sauce", name: "Soy sauce", quantity: "1 bottle" },
          { id: "vinegar", name: "Vinegar", quantity: "1 bottle" },
          { id: "ketchup", name: "Tomato ketchup", quantity: "1 bottle" },
          { id: "chutney", name: "Green chutney", quantity: "200g" },
          { id: "tamarind", name: "Tamarind paste", quantity: "100g" }
        ]
      },
      {
        name: "Canned/Packaged",
        icon: "📦",
        items: [
          { id: "coconut_milk", name: "Coconut milk", quantity: "2 cans" },
          { id: "nori", name: "Sushi nori sheets", quantity: "1 pack" },
          { id: "tortillas", name: "Tortillas/wraps", quantity: "1 pack" },
          { id: "bread", name: "Bread (whole wheat)", quantity: "2 loaves" },
          { id: "pav", name: "Pav bread", quantity: "1 pack" },
          { id: "pizza_base", name: "Pizza base", quantity: "2 pieces" }
        ]
      },
      {
        name: "Dairy (Longer Shelf Life)",
        icon: "🥛",
        items: [
          { id: "milk", name: "Milk", quantity: "5 liters" },
          { id: "whey_protein", name: "Whey protein powder", quantity: "1 container" },
          { id: "cheese_slices", name: "Cheese slices", quantity: "1 pack" },
          { id: "mozzarella", name: "Mozzarella cheese", quantity: "200g" }
        ]
      }
    ]
  },
  wednesday: {
    title: "Wednesday Order",
    subtitle: "Mid-Week Fresh Items - For Thu-Sun",
    emoji: "🥬",
    categories: [
      {
        name: "Fresh Vegetables",
        icon: "🥬",
        items: [
          { id: "spinach", name: "Spinach/palak", quantity: "500g" },
          { id: "methi", name: "Fenugreek/methi", quantity: "2 bunches" },
          { id: "coriander", name: "Coriander leaves", quantity: "3 bunches" },
          { id: "curry_leaves", name: "Curry leaves", quantity: "2 packets" },
          { id: "bhindi", name: "Bhindi/okra", quantity: "500g" },
          { id: "mushrooms", name: "Mushrooms", quantity: "500g" },
          { id: "broccoli", name: "Broccoli", quantity: "2 heads" },
          { id: "lettuce", name: "Lettuce/mixed greens", quantity: "2 packs" },
          { id: "cucumber", name: "Cucumber", quantity: "1 kg" },
          { id: "beetroot", name: "Beetroot", quantity: "4 pieces" },
          { id: "avocado", name: "Avocado", quantity: "4 pieces" },
          { id: "corn", name: "Sweet corn", quantity: "4 pieces or 2 cans" },
          { id: "sprouts", name: "Bean sprouts", quantity: "200g" },
          { id: "spring_onions", name: "Spring onions", quantity: "2 bunches" },
          { id: "asian_greens", name: "Bok choy/Asian greens", quantity: "300g" }
        ]
      },
      {
        name: "Fresh Fruits",
        icon: "🍎",
        items: [
          { id: "apples", name: "Apples", quantity: "1 kg" },
          { id: "bananas", name: "Bananas", quantity: "1 dozen" },
          { id: "seasonal", name: "Oranges/seasonal fruit", quantity: "1 kg" },
          { id: "berries", name: "Berries", quantity: "500g" },
          { id: "dates", name: "Dates", quantity: "250g" },
          { id: "lemons", name: "Lemon/lime", quantity: "10-12 pieces" }
        ]
      },
      {
        name: "Dairy (Fresh)",
        icon: "🧈",
        items: [
          { id: "curd", name: "Curd/yogurt", quantity: "2 kg" },
          { id: "buttermilk", name: "Buttermilk", quantity: "1 liter" },
          { id: "cream", name: "Fresh cream", quantity: "200ml" },
          { id: "butter", name: "Butter", quantity: "200g" }
        ]
      },
      {
        name: "Fresh Herbs & Aromatics",
        icon: "🌿",
        items: [
          { id: "mint", name: "Fresh mint", quantity: "2 bunches" },
          { id: "basil", name: "Fresh basil", quantity: "1 bunch" },
          { id: "lemongrass", name: "Lemongrass", quantity: "2 stalks" }
        ]
      },
      {
        name: "Optional Items",
        icon: "✨",
        items: [
          { id: "sushi_rice", name: "Sushi rice", quantity: "500g" },
          { id: "sushi_fish", name: "Sushi-grade fish", quantity: "300g" },
          { id: "sesame", name: "Sesame seeds", quantity: "100g" },
          { id: "wasabi", name: "Wasabi paste", quantity: "1 small tube" },
          { id: "ginger_pickled", name: "Pickled ginger", quantity: "1 pack" },
          { id: "coconut_water", name: "Coconut water", quantity: "4 bottles" }
        ]
      }
    ]
  }
};

export const prepTips = {
  sunday: [
    "Soak rajma and chole overnight for use during the week",
    "Start sprouting moong dal (takes 2-3 days)",
    "Freeze half the paneer if not using immediately",
    "Marinate chicken portions for different dishes",
    "Prep ginger-garlic paste (lasts 5-7 days in fridge)"
  ],
  wednesday: [
    "Wash and store leafy greens properly (paper towel method)",
    "Cut and store salad vegetables in airtight containers",
    "Make fresh raita/curd preparations",
    "Prep fresh herbs (chop coriander, mint)"
  ]
};
