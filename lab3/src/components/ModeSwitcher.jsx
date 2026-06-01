import React from 'react';

const ModeSwitcher = ({ currentMode, onModeChange }) => {
    return (
        <div className="mode-switcher">
            <button
                className={`mode-button ${currentMode === 'users' ? 'active' : ''}`}
                onClick={() => onModeChange('users')}
            >
                Режим: Список пользователей
            </button>
            <button
                className={`mode-button ${currentMode === 'posts' ? 'active' : ''}`}
                onClick={() => onModeChange('posts')}
            >
                Режим: Все посты
            </button>
        </div>
    );
};

export default ModeSwitcher;