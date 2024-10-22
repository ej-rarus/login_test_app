import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Protected from './Protected';


function Login({ setToken, setMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,  // React 상태에서 가져온 username
                password   // React 상태에서 가져온 password
            });
            setToken(response.data.token);
            setMessage('Login successful');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
        </div>
    );
}



function App() {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Router>
            <div>
                <h1>{message}</h1>
                <Routes>
                    {/* 로그인 페이지 */}
                    <Route path="/login" element={<Login setToken={setToken} setMessage={setMessage} />} />
                    
                    {/* 보호된 페이지 (로그인 상태가 없으면 로그인 페이지로 리다이렉트) */}
                    <Route
                        path="/protected"
                        element={token ? <Protected token={token} setMessage={setMessage} /> : <Navigate to="/login" />}
                    />
                    
                    {/* 기본 경로 (보호된 경로로 리다이렉트 또는 로그인 페이지로 이동) */}
                    <Route path="/" element={<Navigate to={token ? "/protected" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
