import React from 'react';

const UserList = ({ users, selectedUser, onUserSelect }) => {
    if (users.length === 0) {
        return (
            <div className="users-list">
                <h2 className="section-title">Пользователи</h2>
                <div className="no-results">Пользователи не найдены</div>
            </div>
        );
    }

    return (
        <div className="users-list">
            <h2 className="section-title">Пользователи</h2>
            {users.map(user => (
                <div
                    key={user.id}
                    className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                    onClick={() => onUserSelect(user)}
                >
                    <div className="user-name">{user.name}</div>
                    <div className="user-info">@{user.username}</div>
                    <div className="user-info">{user.email}</div>
                </div>
            ))}
        </div>
    );
};

export default UserList;