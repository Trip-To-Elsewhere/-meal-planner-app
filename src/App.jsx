import { useState, useEffect } from 'react';
import { ShoppingCart, Calendar, CheckCircle2, Circle, Share2, RefreshCw, Sun, Cloud } from 'lucide-react';
import { groceryData, prepTips } from './data/groceryData';
import './App.css';

function App() {
  const [activeOrder, setActiveOrder] = useState('sunday');
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checkedItems');
    return saved ? JSON.parse(saved) : {};
  });
  const [showPrepTips, setShowPrepTips] = useState(false);

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const resetChecklist = () => {
    if (window.confirm('Reset all checkboxes? This cannot be undone.')) {
      setCheckedItems({});
    }
  };

  const getProgress = () => {
    const data = groceryData[activeOrder];
    const totalItems = data.categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return { total: totalItems, checked: checkedCount };
  };

  const shareList = async () => {
    const data = groceryData[activeOrder];
    const uncheckedItems = [];

    data.categories.forEach(category => {
      category.items.forEach(item => {
        if (!checkedItems[item.id]) {
          uncheckedItems.push(`☐ ${item.name} - ${item.quantity}`);
        }
      });
    });

    const text = `${data.emoji} ${data.title}\n\nRemaining items:\n${uncheckedItems.join('\n')}`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('List copied to clipboard!');
    }
  };

  const progress = getProgress();
  const currentData = groceryData[activeOrder];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <ShoppingCart size={28} />
            <h1>Weekly Grocery</h1>
          </div>
          <div className="header-actions">
            <button onClick={shareList} className="icon-btn" title="Share list">
              <Share2 size={20} />
            </button>
            <button onClick={resetChecklist} className="icon-btn" title="Reset all">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Order Tabs */}
        <div className="order-tabs">
          <button
            className={`tab ${activeOrder === 'sunday' ? 'active' : ''}`}
            onClick={() => setActiveOrder('sunday')}
          >
            <Sun size={18} />
            <span>Sunday Order</span>
          </button>
          <button
            className={`tab ${activeOrder === 'wednesday' ? 'active' : ''}`}
            onClick={() => setActiveOrder('wednesday')}
          >
            <Cloud size={18} />
            <span>Wednesday Order</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-text">
            <span>{progress.checked} / {progress.total} items</span>
            <span>{Math.round((progress.checked / progress.total) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.checked / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Order Info */}
      <div className="order-info">
        <div className="order-title">
          <span className="order-emoji">{currentData.emoji}</span>
          <div>
            <h2>{currentData.title}</h2>
            <p>{currentData.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Prep Tips Toggle */}
      <button
        className="prep-tips-toggle"
        onClick={() => setShowPrepTips(!showPrepTips)}
      >
        <Calendar size={18} />
        {showPrepTips ? 'Hide' : 'Show'} Prep Tips
      </button>

      {/* Prep Tips */}
      {showPrepTips && (
        <div className="prep-tips">
          <h3>📋 Prep Tips for {currentData.title}</h3>
          <ul>
            {prepTips[activeOrder].map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories */}
      <div className="categories">
        {currentData.categories.map(category => {
          const categoryChecked = category.items.filter(item => checkedItems[item.id]).length;
          const categoryTotal = category.items.length;

          return (
            <div key={category.name} className="category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <span className="category-count">
                  {categoryChecked}/{categoryTotal}
                </span>
              </div>
              <div className="items">
                {category.items.map(item => (
                  <label key={item.id} className="item">
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="item-checkbox"
                    />
                    <div className="item-content">
                      <div className="item-check">
                        {checkedItems[item.id] ? (
                          <CheckCircle2 size={22} className="checked" />
                        ) : (
                          <Circle size={22} className="unchecked" />
                        )}
                      </div>
                      <div className="item-details">
                        <span className={`item-name ${checkedItems[item.id] ? 'checked' : ''}`}>
                          {item.name}
                        </span>
                        <span className="item-quantity">{item.quantity}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>🍽️ Smart Weekly Grocery Planning</p>
        <p className="footer-note">Lists saved automatically to your device</p>
      </footer>
    </div>
  );
}

export default App;
