import { useState, useEffect } from 'react';
import { ChefHat, Calendar, ShoppingCart, List, ChevronRight, Check } from 'lucide-react';
import MealSelector from './components/MealSelector';
import IngredientViewer from './components/IngredientViewer';
import ShoppingLists from './components/ShoppingLists';
import './AppNew.css';

function AppNew() {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('currentStep');
    return saved || 'select';
  });

  const [selectedMeals, setSelectedMeals] = useState(() => {
    const saved = localStorage.getItem('selectedMeals');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  const steps = [
    { id: 'select', label: 'Select Meals', icon: ChefHat },
    { id: 'review', label: 'Review Ingredients', icon: List },
    { id: 'lists', label: 'Shopping Lists', icon: ShoppingCart }
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);

  const handleMealsSelected = (meals) => {
    setSelectedMeals(meals);
    setCurrentStep('review');
  };

  const handleBackToSelection = () => {
    setCurrentStep('select');
  };

  const handleGenerateLists = () => {
    setCurrentStep('lists');
  };

  const handleStartOver = () => {
    setSelectedMeals({});
    setCurrentStep('select');
  };

  return (
    <div className="app-new">
      {/* Header with Progress */}
      <header className="header-new">
        <div className="header-content-new">
          <div className="brand">
            <Calendar size={28} />
            <h1>Weekly Meal Planner</h1>
          </div>
          <p className="subtitle">For 2 People - You & Sanjana</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = getCurrentStepIndex() > index;

            return (
              <div key={step.id} className="step-wrapper">
                <div className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  <div className="step-icon">
                    {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                  </div>
                  <span className="step-label">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="step-arrow" size={20} />
                )}
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content-new">
        {currentStep === 'select' && (
          <MealSelector
            selectedMeals={selectedMeals}
            onMealsSelected={handleMealsSelected}
          />
        )}

        {currentStep === 'review' && (
          <IngredientViewer
            selectedMeals={selectedMeals}
            onBack={handleBackToSelection}
            onGenerateLists={handleGenerateLists}
          />
        )}

        {currentStep === 'lists' && (
          <ShoppingLists
            selectedMeals={selectedMeals}
            onStartOver={handleStartOver}
            onBack={() => setCurrentStep('review')}
          />
        )}
      </main>
    </div>
  );
}

export default AppNew;
