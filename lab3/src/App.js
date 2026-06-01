import React, { useState, useEffect } from 'react';
import './styles/App.css';
import UserList from './components/UserList';
import PostsList from './components/PostsList';
import SearchBar from './components/SearchBar';
import ModeSwitcher from './components/ModeSwitcher';

function App() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('users');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загрузка данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersRes, postsRes] = await Promise.all([
                    fetch('https://jsonplaceholder.typicode.com/users'),
                    fetch('https://jsonplaceholder.typicode.com/posts')
                ]);

                if (!usersRes.ok || !postsRes.ok) {
                    throw new Error('Ошибка загрузки данных');
                }

                const usersData = await usersRes.json();
                const postsData = await postsRes.json();

                setUsers(usersData);
                setPosts(postsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Получение имени пользователя по ID
    const getUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Неизвестный пользователь';
    };

    // Фильтрация пользователей
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Фильтрация постов
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Получение постов выбранного пользователя
    const getUserPosts = (userId) => {
        return posts.filter(post => post.userId === userId);
    };

    // Обработчик смены режима
    const handleModeChange = (mode) => {
        setViewMode(mode);
        setSelectedUser(null);
        setSearchTerm('');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader">Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">Ошибка: {error}</div>
            </div>
        );
    }

    return (
        <div className="app">
            <h1 className="title">Блог постов</h1>

            <ModeSwitcher
                currentMode={viewMode}
                onModeChange={handleModeChange}
            />

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder={viewMode === 'users' ? "Поиск пользователей..." : "Поиск постов..."}
            />

            {viewMode === 'users' ? (
                <div className="users-container">
                    <UserList
                        users={filteredUsers}
                        selectedUser={selectedUser}
                        onUserSelect={setSelectedUser}
                    />

                    {selectedUser && (
                        <div className="posts-container">
                            <h2 className="section-title">
                                Посты пользователя: {selectedUser.name}
                            </h2>
                            <PostsList
                                posts={getUserPosts(selectedUser.id)}
                                getUserName={() => selectedUser.name}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="all-posts-container">
                    <h2 className="section-title">Все посты</h2>
                    <PostsList
                        posts={filteredPosts}
                        getUserName={getUserName}
                    />
                </div>
            )}
        </div>
    );
}

export default App;