import React, { useState, useEffect } from 'react';

const App = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('users');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
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

    
    const getUserPosts = (userId) => {
        return posts.filter(post => post.userId === userId);
    };

    
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    const getUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Неизвестный пользователь';
    };

    
    const handleUserClick = (user) => {
        setSelectedUser(selectedUser?.id === user.id ? null : user);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loader}>Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <div style={styles.error}>Ошибка: {error}</div>
            </div>
        );
    }

    return (
        <div style={styles.app}>
            <h1 style={styles.title}>Блог постов</h1>

            
            <div style={styles.modeSwitcher}>
                <button
                    style={{ ...styles.modeButton, ...(viewMode === 'users' ? styles.activeMode : {}) }}
                    onClick={() => {
                        setViewMode('users');
                        setSelectedUser(null);
                        setSearchTerm('');
                    }}
                >
                    Режим: Список пользователей
                </button>
                <button
                    style={{ ...styles.modeButton, ...(viewMode === 'posts' ? styles.activeMode : {}) }}
                    onClick={() => {
                        setViewMode('posts');
                        setSelectedUser(null);
                        setSearchTerm('');
                    }}
                >
                    Режим: Все посты
                </button>
            </div>

            
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder={viewMode === 'users' ? "Поиск пользователей..." : "Поиск постов..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            
            {viewMode === 'users' ? (
                <div style={styles.usersContainer}>
                    
                    <div style={styles.usersList}>
                        <h2 style={styles.sectionTitle}>Пользователи</h2>
                        {filteredUsers.length === 0 ? (
                            <div style={styles.noResults}>Пользователи не найдены</div>
                        ) : (
                            filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    style={{
                                        ...styles.userCard,
                                        ...(selectedUser?.id === user.id ? styles.selectedUser : {})
                                    }}
                                    onClick={() => handleUserClick(user)}
                                >
                                    <div style={styles.userName}>{user.name}</div>
                                    <div style={styles.userInfo}>@{user.username}</div>
                                    <div style={styles.userInfo}>{user.email}</div>
                                </div>
                            ))
                        )}
                    </div>

                    
                    {selectedUser && (
                        <div style={styles.postsContainer}>
                            <h2 style={styles.sectionTitle}>
                                Посты пользователя: {selectedUser.name}
                            </h2>
                            <div style={styles.postsList}>
                                {getUserPosts(selectedUser.id).length === 0 ? (
                                    <div style={styles.noResults}>У пользователя нет постов</div>
                                ) : (
                                    getUserPosts(selectedUser.id).map(post => (
                                        <div key={post.id} style={styles.postCard}>
                                            <div style={styles.postHeader}>
                                                <span style={styles.postAuthor}>{selectedUser.name}</span>
                                            </div>
                                            <div style={styles.postBody}>
                                                <h3 style={styles.postTitle}>{post.title}</h3>
                                                <p style={styles.postText}>{post.body}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                
                <div style={styles.allPostsContainer}>
                    <h2 style={styles.sectionTitle}>Все посты</h2>
                    <div style={styles.postsGrid}>
                        {filteredPosts.length === 0 ? (
                            <div style={styles.noResults}>Посты не найдены</div>
                        ) : (
                            filteredPosts.map(post => (
                                <div key={post.id} style={styles.postCard}>
                                    <div style={styles.postHeader}>
                                        <span style={styles.postAuthor}>{getUserName(post.userId)}</span>
                                    </div>
                                    <div style={styles.postBody}>
                                        <h3 style={styles.postTitle}>{post.title}</h3>
                                        <p style={styles.postText}>{post.body}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    app: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
        fontSize: '2.5em'
    },
    modeSwitcher: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '30px'
    },
    modeButton: {
        padding: '10px 20px',
        fontSize: '16px',
        border: '2px solid #007bff',
        backgroundColor: 'white',
        color: '#007bff',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'all 0.3s'
    },
    activeMode: {
        backgroundColor: '#007bff',
        color: 'white'
    },
    searchContainer: {
        marginBottom: '30px'
    },
    searchInput: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxSizing: 'border-box'
    },
    usersContainer: {
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap'
    },
    usersList: {
        flex: '1',
        minWidth: '300px'
    },
    postsContainer: {
        flex: '2',
        minWidth: '400px'
    },
    allPostsContainer: {
        width: '100%'
    },
    sectionTitle: {
        color: '#555',
        marginBottom: '20px',
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px'
    },
    userCard: {
        backgroundColor: 'white',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    selectedUser: {
        backgroundColor: '#e3f2fd',
        borderLeft: '4px solid #007bff'
    },
    userName: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px'
    },
    userInfo: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '3px'
    },
    postsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    postsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
    },
    postCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        cursor: 'pointer'
    },
    postHeader: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 15px',
        fontWeight: 'bold'
    },
    postAuthor: {
        fontSize: '16px'
    },
    postBody: {
        padding: '15px'
    },
    postTitle: {
        margin: '0 0 10px 0',
        color: '#333',
        fontSize: '18px',
        textTransform: 'capitalize'
    },
    postText: {
        margin: 0,
        color: '#666',
        lineHeight: '1.6',
        textTransform: 'capitalize'
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
    },
    loader: {
        fontSize: '24px',
        color: '#007bff'
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
    },
    error: {
        fontSize: '20px',
        color: 'red',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    noResults: {
        textAlign: 'center',
        padding: '40px',
        color: '#999',
        fontSize: '18px'
    }
};

export default App;
