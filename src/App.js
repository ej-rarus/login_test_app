import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Protected from './Protected';

function App() {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가

    // 컴포넌트가 렌더링될 때마다 로컬 스토리지에서 토큰을 불러옴
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken && storedToken !== '') {
            setToken(storedToken);
        }
        setLoading(false);  // 로딩 완료
    }, []);  // 빈 의존성 배열을 통해 한 번만 실행

    if (loading) {
        // 로딩 중에는 아무것도 렌더링하지 않거나 로딩 표시
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div>
                <Routes>
                    {/* 기본 경로 (보호된 경로로 리다이렉트 또는 로그인 페이지로 이동) */}
                    <Route path="/" element={<Navigate to={token ? "/protected" : "/login"} />} />
                    
                    {/* 로그인 페이지 */}
                    <Route path="/login" element={<Login setToken={setToken} setMessage={setMessage} />} />
                    
                    {/* 보호된 페이지 (로그인 상태가 없으면 로그인 페이지로 리다이렉트) */}
                    <Route
                        path="/protected"
                        element={<Protected token={token} setMessage={setMessage} />}
                    />
                    
                </Routes>
                <h1>{message}</h1>
            </div>
        </Router>
    );
}

export default App;
