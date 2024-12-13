import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie'; 

const Logout = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
     
        sessionStorage.removeItem('user');

      
        Cookies.remove('userEmail');

     
        navigate('/');
    }, [navigate]);

    return (
        <div className="text-center" style={{ marginTop: '50px' }}>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
