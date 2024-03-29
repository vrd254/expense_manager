import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Authentication = () => {

    const linkStyle = {
        textDecoration: 'none', // Removes the underline
        color: 'inherit', // Keeps the default link color
    };

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', credentials);

            if (response.status === 200) {
                const { token } = response.data;
                sessionStorage.setItem('token', token);
                localStorage.setItem('uname',credentials.username);
                console.log('Login successful!');
                navigate('/dashboard');
            } else {
                console.error('Login failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <div className='conatiner'>
            <div className='center'>
                <h1>Login</h1>
                <form action='' method='POST' onSubmit={handleLogin}>
                    <div className='txt_field'>
                        <input type="text" name="username" required value={credentials.username} onChange={handleChange}/>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className='txt_field'>
                        <input type="password" name="password" required value={credentials.password} onChange={handleChange}/>
                        <span></span>
                        <label>Password</label>
                    </div>

                    <input name="submit" type="Submit" value="Login"/>
                    <Link to = "/signup" style={linkStyle}>
                        <div class="signup_link">
                            Not a Member ? Signup
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Authentication
