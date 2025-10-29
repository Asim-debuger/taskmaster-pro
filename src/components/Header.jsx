import React from 'react';

const Header = ({ activeTab, setActiveTab, darkMode, toggleDarkMode }) => {
  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: 'fa-list-check' },
    { id: 'add', label: 'Add Task', icon: 'fa-plus' },
    { id: 'bin', label: 'Bin', icon: 'fa-trash' },
    { id: 'stats', label: 'Statistics', icon: 'fa-chart-simple' }
  ];

  return (
    <header>
      <i className="fas fa-tasks"></i>
      <h1>TaskMaster Pro</h1>
      
      <nav className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`fas ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </nav>
      
      <button className="theme-toggle" onClick={toggleDarkMode}>
        <i className="fas fa-sun"></i>
        <i className="fas fa-moon"></i>
      </button>
    </header>
  );
};

export default Header;