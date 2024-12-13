import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {

        const savedEmail = Cookies.get('userEmail');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            const data = await response.json();

            if (response.ok) {
             
                console.log(data); 

               
                sessionStorage.setItem('user', JSON.stringify(data));

              
                const rememberMe = document.getElementById('rememberMe').checked;
                if (rememberMe) {
                 
                    Cookies.set('userEmail', email, { expires: 7 });
                }

              
                switch (data.user.User_Type) { 
                    case 'admin':
                        navigate('/admin'); 
                        break;
                    case 'teacher':
                        navigate('/teacher'); 
                        break;
                    case 'student':
                        navigate('/student'); 
                        break;
                    default:
                        setError('Invalid user type.'); 
                }
            } else {
                setError(data.error || 'User not found.'); 
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred, please try again.');
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundColor: '#e9ecef',
                padding: '20px'
            }}
        >
            <div
                className="card p-4 shadow-lg"
                style={{
                    width: '1000px',
                    height: 'auto',
                    borderRadius: '10px',
                    backgroundColor: '#f8f9fa'
                }}
            >
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Username/Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter username or email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember Me
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-3">Login</button>

                    {error && <p className="text-danger text-center">{error}</p>} {/* Display error message if any */}

                    <p className="text-center">
                        Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login; 
