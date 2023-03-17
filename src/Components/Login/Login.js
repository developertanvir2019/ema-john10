import React from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UseTitle from '../../UseTitle/UseTitle';
import { AuthContext } from '../UserContext';

const Login = () => {
    UseTitle('Login')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { signIn } = useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.error(err)
            })
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} className='w-50 mx-auto mt-5'>
                <Form.Label>Email address</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control required name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className='text-center'>new to ema-john? <Link to='/signup'>create new account</Link></p>
        </div>
    );
};

export default Login;