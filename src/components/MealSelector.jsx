import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, ChevronRight } from 'lucide-react';
import { mealPlanData, dayNames, mealTypes } from '../data/mealPlanData';

function MealSelector({ selectedMeals, onMealsSelected }) {
  const [localMeals, setLocalMeals] = useState(selectedMeals);
  const [expandedDays, setExpandedDays] = useState({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const toggleDay = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const selectMeal = (day, mealType, mealName) => {
    setLocalMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: mealName
      }
    }));
  };

  const quickFillPlanA = () => {
    const meals = {};
    dayNames.forEach(day => {
      meals[day] = mealPlanData[day].planA;
    });
    setLocalMeals(meals);
  };

  const quickFillPlanB = () => {
    const meals = {};
    dayNames.forEach(day => {
      meals[day] = mealPlanData[day].planB;
    });
    setLocalMeals(meals);
  };

  const handleContinue = () => {
    onMealsSelected(localMeals);
  };

  const getTotalSelectedMeals = () => {
    let count = 0;
    dayNames.forEach(day => {
      if (localMeals[day]) {
        count += Object.keys(localMeals[day]).length;
      }
    });
    return count;
  };

  const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const mealTypeLabels = {
    breakfast: '🌅 Breakfast',
    lunch: '☀️ Lunch',
    dinner: '🌙 Dinner',
    snacks: '🍎 Snacks'
  };

  const totalMeals = getTotalSelectedMeals();
  const expectedMeals = dayNames.length * mealTypes.length; // 7 days × 4 meals = 28

  return (
    <div className="meal-selector">
      <div className="selector-header">
        <h2>Select Your Weekly Meals</h2>
        <p>Choose what you'll cook each day. Pick from Plan A or Plan B options, or mix and match!</p>

        <div className="quick-fill">
          <button className="quick-btn plan-a" onClick={quickFillPlanA}>
            <Sparkles size={18} />
            Quick Fill: Plan A (Traditional Indian)
          </button>
          <button className="quick-btn plan-b" onClick={quickFillPlanB}>
            <Sparkles size={18} />
            Quick Fill: Plan B (Fusion & Light)
          </button>
        </div>

        <div className="meal-counter">
          <span className="counter-text">
            {totalMeals} of {expectedMeals} meals selected
          </span>
          <div className="counter-bar">
            <div
              className="counter-fill"
              style={{ width: `${(totalMeals / expectedMeals) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="days-list">
        {dayNames.map(day => {
          const isExpanded = expandedDays[day];
          const dayMeals = localMeals[day] || {};
          const selectedCount = Object.keys(dayMeals).length;

          return (
            <div key={day} className="day-card">
              <button
                className="day-header"
                onClick={() => toggleDay(day)}
              >
                <div className="day-title">
                  <h3>{dayLabels[day]}</h3>
                  <span className="meal-count">{selectedCount}/4 meals</span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isExpanded && (
                <div className="day-content">
                  {mealTypes.map(mealType => {
                    const planAMeal = mealPlanData[day].planA[mealType];
                    const planBMeal = mealPlanData[day].planB[mealType];
                    const selected = dayMeals[mealType];

                    return (
                      <div key={mealType} className="meal-type">
                        <label className="meal-label">{mealTypeLabels[mealType]}</label>
                        <div className="meal-options">
                          <button
                            className={`meal-option ${selected === planAMeal ? 'selected' : ''}`}
                            onClick={() => selectMeal(day, mealType, planAMeal)}
                          >
                            <div className="option-indicator" />
                            <div className="option-content">
                              <span className="option-label">Plan A</span>
                              <span className="option-meal">{planAMeal}</span>
                            </div>
                          </button>

                          <button
                            className={`meal-option ${selected === planBMeal ? 'selected' : ''}`}
                            onClick={() => selectMeal(day, mealType, planBMeal)}
                          >
                            <div className="option-indicator" />
                            <div className="option-content">
                              <span className="option-label">Plan B</span>
                              <span className="option-meal">{planBMeal}</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="selector-footer">
        <button
          className="continue-btn"
          onClick={handleContinue}
          disabled={totalMeals === 0}
        >
          Continue to Review Ingredients
          <ChevronRight size={20} />
        </button>
        {totalMeals < expectedMeals && (
          <p className="footer-note">
            You can continue with {totalMeals} meals, or select all {expectedMeals} for the complete week
          </p>
        )}
      </div>
    </div>
  );
}

export default MealSelector;
