import { useState } from "react";
import axios from "axios";

function Login({ setToken, setMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,  // React 상태에서 가져온 username
                password   // React 상태에서 가져온 password
            });
            
            const token = response.data.token;
            setToken(token);  // 상태에 토큰 저장
            localStorage.setItem('jwtToken', token);  // 로컬 스토리지에 토큰 저장
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

export default Login;