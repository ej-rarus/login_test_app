import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './Login';
import Protected from './Protected';








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
