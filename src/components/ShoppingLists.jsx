import { useState } from 'react';
import { Sun, Cloud, Copy, Check, ChevronLeft, RotateCcw, Share2 } from 'lucide-react';
import { recipeDatabase, ingredientDatabase } from '../data/ingredientDatabase';
import { dayNames } from '../data/mealPlanData';

function ShoppingLists({ selectedMeals, onStartOver, onBack }) {
  const [copiedSunday, setCopiedSunday] = useState(false);
  const [copiedWednesday, setCopiedWednesday] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Calculate and consolidate ingredients
  const calculateShoppingLists = () => {
    const sundayList = {};
    const wednesdayList = {};

    dayNames.forEach(day => {
      const dayMeals = selectedMeals[day];
      if (!dayMeals) return;

      Object.values(dayMeals).forEach(mealName => {
        const ingredients = recipeDatabase[mealName];

        if (ingredients) {
          ingredients.forEach(ingredientKey => {
            const ingredient = ingredientDatabase[ingredientKey];
            if (!ingredient) return;

            const targetList = ingredient.shelfLife === 'sunday' ? sundayList : wednesdayList;

            if (!targetList[ingredientKey]) {
              targetList[ingredientKey] = {
                ...ingredient,
                count: 0
              };
            }
            targetList[ingredientKey].count += 1;
          });
        }
      });
    });

    return { sundayList, wednesdayList };
  };

  const { sundayList, wednesdayList } = calculateShoppingLists();

  // Group by category
  const groupByCategory = (list) => {
    const grouped = {};
    Object.entries(list).forEach(([key, item]) => {
      const category = item.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push({ key, ...item });
    });
    return grouped;
  };

  const sundayGrouped = groupByCategory(sundayList);
  const wednesdayGrouped = groupByCategory(wednesdayList);

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

  // Calculate estimated quantities
  const calculateQuantity = (item) => {
    const baseQty = item.qty;
    const multiplier = item.count;

    // For "per item" ingredients, multiply directly
    if (baseQty.includes('pieces') || baseQty.includes('medium') || baseQty.includes('bunch')) {
      const num = parseInt(baseQty) || 1;
      const unit = baseQty.replace(/[0-9]/g, '').trim();
      return `${num * multiplier} ${unit}`;
    }

    // For measurements (cups, grams, etc.)
    if (baseQty.includes('cup')) {
      const num = parseFloat(baseQty) || 1;
      const total = num * multiplier;
      if (total > 4) {
        return `${Math.ceil(total / 4)} kg approx`;
      }
      return `${total} cups`;
    }

    if (baseQty.includes('g')) {
      const num = parseInt(baseQty) || 100;
      const total = num * multiplier;
      if (total >= 1000) {
        return `${(total / 1000).toFixed(1)} kg`;
      }
      return `${total}g`;
    }

    if (baseQty.includes('ml')) {
      const num = parseInt(baseQty) || 100;
      const total = num * multiplier;
      if (total >= 1000) {
        return `${(total / 1000).toFixed(1)} liter`;
      }
      return `${total}ml`;
    }

    if (baseQty.includes('tbsp') || baseQty.includes('tsp')) {
      return `${baseQty} × ${multiplier} times`;
    }

    return `${baseQty} × ${multiplier} times`;
  };

  // Format for copying to Swiggy
  const formatForSwiggy = (grouped) => {
    let text = '';

    Object.entries(grouped).forEach(([category, items]) => {
      text += `${categoryLabels[category] || category}:\n`;
      items.forEach(item => {
        const qty = calculateQuantity(item);
        text += `• ${item.name} - ${qty}\n`;
      });
      text += '\n';
    });

    return text;
  };

  const copyToClipboard = async (text, isWednesday = false) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isWednesday) {
        setCopiedWednesday(true);
        setTimeout(() => setCopiedWednesday(false), 2000);
      } else {
        setCopiedSunday(true);
        setTimeout(() => setCopiedSunday(false), 2000);
      }
    } catch (err) {
      alert('Copied to clipboard!');
    }
  };

  const shareList = async (text, title) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text
        });
      } catch (err) {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const toggleItem = (key) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sundayText = formatForSwiggy(sundayGrouped);
  const wednesdayText = formatForSwiggy(wednesdayGrouped);

  const sundayCount = Object.keys(sundayList).length;
  const wednesdayCount = Object.keys(wednesdayList).length;

  return (
    <div className="shopping-lists">
      <div className="lists-header">
        <h2>Your Shopping Lists</h2>
        <p>Ready to order! Two lists optimized for freshness</p>
      </div>

      {/* Sunday List */}
      <div className="list-section sunday-section">
        <div className="list-header">
          <div className="list-title">
            <Sun size={28} />
            <div>
              <h3>Sunday Order</h3>
              <p>Long-lasting items • {sundayCount} ingredients</p>
            </div>
          </div>
          <div className="list-actions">
            <button
              className="action-btn copy-btn"
              onClick={() => copyToClipboard(sundayText, false)}
            >
              {copiedSunday ? <Check size={18} /> : <Copy size={18} />}
              {copiedSunday ? 'Copied!' : 'Copy for Swiggy'}
            </button>
            <button
              className="action-btn share-btn"
              onClick={() => shareList(sundayText, 'Sunday Grocery Order')}
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        <div className="list-content">
          {Object.entries(sundayGrouped).map(([category, items]) => (
            <div key={category} className="list-category">
              <h4>{categoryLabels[category] || category}</h4>
              <ul className="items-list">
                {items.map(item => {
                  const qty = calculateQuantity(item);
                  const itemKey = `sunday-${item.key}`;
                  const isChecked = checkedItems[itemKey];

                  return (
                    <li
                      key={item.key}
                      className={`list-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleItem(itemKey)}
                    >
                      <div className="item-checkbox">
                        {isChecked && <Check size={16} />}
                      </div>
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">{qty}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Wednesday List */}
      <div className="list-section wednesday-section">
        <div className="list-header">
          <div className="list-title">
            <Cloud size={28} />
            <div>
              <h3>Wednesday Order</h3>
              <p>Fresh items for Thu-Sun • {wednesdayCount} ingredients</p>
            </div>
          </div>
          <div className="list-actions">
            <button
              className="action-btn copy-btn"
              onClick={() => copyToClipboard(wednesdayText, true)}
            >
              {copiedWednesday ? <Check size={18} /> : <Copy size={18} />}
              {copiedWednesday ? 'Copied!' : 'Copy for Swiggy'}
            </button>
            <button
              className="action-btn share-btn"
              onClick={() => shareList(wednesdayText, 'Wednesday Grocery Order')}
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        <div className="list-content">
          {Object.entries(wednesdayGrouped).map(([category, items]) => (
            <div key={category} className="list-category">
              <h4>{categoryLabels[category] || category}</h4>
              <ul className="items-list">
                {items.map(item => {
                  const qty = calculateQuantity(item);
                  const itemKey = `wednesday-${item.key}`;
                  const isChecked = checkedItems[itemKey];

                  return (
                    <li
                      key={item.key}
                      className={`list-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleItem(itemKey)}
                    >
                      <div className="item-checkbox">
                        {isChecked && <Check size={16} />}
                      </div>
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">{qty}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="lists-footer">
        <button className="footer-btn secondary" onClick={onBack}>
          <ChevronLeft size={20} />
          Back to Review
        </button>
        <button className="footer-btn primary" onClick={onStartOver}>
          <RotateCcw size={20} />
          Start New Week
        </button>
      </div>

      {/* Usage Tips */}
      <div className="usage-tips">
        <h4>💡 How to Use</h4>
        <ul>
          <li><strong>Sunday Order:</strong> Click "Copy for Swiggy" and paste in Swiggy chat or Instamart</li>
          <li><strong>Wednesday Order:</strong> Order mid-week for fresh vegetables and fruits</li>
          <li><strong>Check items:</strong> Tap items as you add them to cart or receive delivery</li>
          <li><strong>Share:</strong> Send list to Sanjana or your cook via WhatsApp</li>
        </ul>
      </div>
    </div>
  );
}

export default ShoppingLists;
