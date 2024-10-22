import axios from "axios";

function Protected({ token, setMessage }) {
    const accessProtected = async () => {
        try {
            const response = await axios.get('http://localhost:5000/protected', {
                headers: {
                    Authorization: token
                }
            });
            setMessage(response.data.message);
        } catch (error) {
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