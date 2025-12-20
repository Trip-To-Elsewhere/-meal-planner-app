// Complete meal plan options from your spreadsheet
export const mealPlanData = {
  monday: {
    planA: {
      breakfast: "Veg oats + chai",
      lunch: "2 rotis + dal + veg + salad",
      dinner: "Chicken curry + veg + 1 roti",
      snacks: "Fruit + nuts"
    },
    planB: {
      breakfast: "Idli + chai",
      lunch: "Paneer bhurji + roti + salad",
      dinner: "California burrito bowl",
      snacks: "Fruit + nuts"
    }
  },
  tuesday: {
    planA: {
      breakfast: "Poha + fruit",
      lunch: "Rajma chawal + salad",
      dinner: "Mushroom masala + roti",
      snacks: "Chana / makhana"
    },
    planB: {
      breakfast: "Grilled sandwich + chai",
      lunch: "Chicken wrap",
      dinner: "Chinese stir fry chicken + veg",
      snacks: "Fruit + nuts"
    }
  },
  wednesday: {
    planA: {
      breakfast: "Besan chilla + chutney",
      lunch: "Bhindi + dal + roti",
      dinner: "Paneer shahi + roti",
      snacks: "Fruit + nuts"
    },
    planB: {
      breakfast: "Dosa + sambhar",
      lunch: "Sushi bowl",
      dinner: "Lemon rice + curd",
      snacks: "Fruit + nuts"
    }
  },
  thursday: {
    planA: {
      breakfast: "Paratha + curd + chai",
      lunch: "Methi chicken + roti + salad",
      dinner: "Sprouts stir fry",
      snacks: "Fruit + nuts"
    },
    planB: {
      breakfast: "Oats bowl + fruit",
      lunch: "Subway 6-inch",
      dinner: "Soup + grilled protein",
      snacks: "Fruit + nuts"
    }
  },
  friday: {
    planA: {
      breakfast: "Upma + fruit",
      lunch: "Chole chawal",
      dinner: "Chicken tikka + veg",
      snacks: "Fruit + nuts"
    },
    planB: {
      breakfast: "Omelette + toast + chai",
      lunch: "Buddha bowl",
      dinner: "Fish & chips (shared)",
      snacks: "Fruit + nuts"
    }
  },
  saturday: {
    planA: {
      breakfast: "Moong dal chilla",
      lunch: "Curd rice",
      dinner: "Pav bhaji - 1 pav",
      snacks: "Fruit + nuts"
    },
    planB: {
      breakfast: "Smoothie bowl",
      lunch: "Asian rice + chicken",
      dinner: "Thin crust pizza (shared)",
      snacks: "Fruit + nuts"
    }
  },
  sunday: {
    planA: {
      breakfast: "Dosa / idli",
      lunch: "Veg + dal + roti",
      dinner: "Paneer / chicken dish",
      snacks: "Fruit + nuts"
    },
    planB: {
      breakfast: "Fruit + chai",
      lunch: "Light roti sabzi",
      dinner: "Sushi / Chinese / Burrito",
      snacks: "Fruit + nuts"
    }
  }
};

// Buffer meals for flexibility
export const bufferMeals = {
  breakfast: [
    "Veg oats + chai",
    "Fruit + chai",
    "Omelette + toast + chai",
    "Poha + fruit",
    "Upma + fruit",
    "Idli + chai",
    "Grilled sandwich + chai",
    "Oats bowl + fruit"
  ],
  lunch: [
    "2 rotis + dal + veg + salad",
    "Rajma chawal + salad",
    "Chole chawal",
    "Paneer bhurji + roti + salad",
    "Bhindi + dal + roti",
    "Curd rice"
  ],
  dinner: [
    "Chicken curry + veg + 1 roti",
    "Paneer shahi + roti",
    "Mushroom masala + roti",
    "Sprouts stir fry",
    "Pav bhaji - 1 pav",
    "Lemon rice + curd",
    "Methi chicken + roti + salad",
    "Chicken tikka + veg",
    "Sushi bowl",
    "Buddha bowl",
    "Chinese stir fry chicken + veg"
  ]
};

export const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
export const mealTypes = ["breakfast", "lunch", "dinner", "snacks"];
