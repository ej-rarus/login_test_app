import axios from "axios";

function Protected({ token, setMessage }) {
    const accessProtected = async () => {
        try {
            console.log('Token being used for request:', token);  // 토큰 확인
            const response = await axios.get('http://localhost:5000/protected', {
                headers: {
                    Authorization: `Bearer ${token}`  // Bearer로 전달
                }
            });
            console.log('Protected route response:', response.data);  // 응답 확인
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error accessing protected route:', error);  // 에러 확인
            setMessage('Failed to access protected route');
        }
    };

    return (
        <div>
            <h1>Protected Page</h1>
            <button onClick={accessProtected}>Access Protected Route</button>
        </div>
    );
}

export default Protected;
