import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'male',
        email: '',
        username: '',
        password: '',
    });

    const [successMessage, setSuccessMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         
            const response = await axios.post('http://localhost:8000/api/create-user', {
                name: formData.name,
                phone_number: formData.phone,
                gender: formData.gender,
                email: formData.email,
                username: formData.username,
                password: formData.password,
            });
            console.log('User created:', response.data);
            setSuccessMessage('User created successfully! You can now log in.'); 
            setErrorMessage(''); 
            
            setTimeout(() => {
                navigate('/login');
            }, 2000); 
        } catch (error) {
            console.error('Error creating user:', error.response?.data || error.message);
            setErrorMessage(error.response?.data?.error || 'Error creating user. Please try again.'); // Set error message
            setSuccessMessage(''); 
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Student Sign Up Page</h1>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 bg-light p-4 rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                <p className="mt-3 text-center">Already have an account? <Link to='/login'>login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;
