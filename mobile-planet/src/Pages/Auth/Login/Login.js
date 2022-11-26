import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import google from '../../../assets/login/google.png'
import facebook from '../../../assets/login/facebook.png'
import github from '../../../assets/login/github.png'
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider';
import { errorToast, successToast } from '../../../toast/Toaster';
import { useToken } from '../../../hooks/useToken';
const Login = () => {
    const { userSignIn, loading, setLoading, signInByGoogle } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('')
    const token = useToken(loggedInUserEmail)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate('/')
    }

    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {
        setLoading(true)
        const { email, password } = data

        userSignIn(email, password)
            .then(() => {
                successToast(`You Logged in successfully`);
                setLoading(false)
                setLoggedInUserEmail(email)
            })
            .catch((e) => {
                const errorMessage = e.message;
                errorToast(errorMessage);
                setLoading(false)
                console.log(errorMessage);
            })
    }

    const googleSignIn = () => {
        signInByGoogle()
            .then((result) => {
                const userData = result.user;
                const user = {
                    name: userData.displayName,
                    email: userData.email,
                    role: 'buyer',
                    verified: false
                }
                saveUser(user)
                successToast(`Hi,${user.displayName}  You Logged in successfully`);
            }).catch((e) => {
                errorToast(e);
            });
    }

    //? Save user some details into mongodb
    const saveUser = (user) => {
        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    successToast('successfully created an account')
                    setLoading(false)
                    setLoggedInUserEmail(user.email)
                }
                else {
                    errorToast('Something went wrong')
                }
            })
    }

    return (
        <Container>
            <Row className='my-5'>
                <Col md={4} sm={10} className='mx-auto border p-5 rounded text-secondary auth-card'>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <h1 className='text-center pb-4'>Login</h1>
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input {...register("email", {
                                required: { value: true, message: "Email Address is required" },
                                // pattern: {
                                //     value: /^\S+@\S+$/i,
                                //     message: "I think I said _valid_, didn't I?"
                                // }
                            })} type="email" className="form-control" id="exampleInputEmail1" aria-invalid={errors.email ? "true" : "false"} />
                            {errors.email && <p className='text-danger fw-bold my-1' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input {...register("password", {
                                required: { value: true, message: "Password Address is required" },
                                minLength: { value: 6, message: 'Password must be 6 characters!' }
                            })} type="password" className="form-control" id="exampleInputPassword1" aria-invalid={errors.password ? "true" : "false"} />
                            {errors.password && <p className='text-danger fw-bold my-1' role="alert">{errors.password?.message}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary text-center col-12  rounded">
                            <div>

                                {loading
                                    ?
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <>Login <FaArrowRight></FaArrowRight></>}
                            </div>
                        </button>
                    </form>
                    <div className="form-text text-center p-2 mt-3">Doesn't have an account? <Link to="/signup">Create new Acoount</Link></div>
                    <hr />
                    <div className='d-flex justify-content-center mt-3'>
                        <img className='m-4' role="button" src={google} onClick={googleSignIn} alt='Logo' width={30} />
                        <img className='m-4' role="button" src={github} alt='Logo' width={30} />
                        <img className='m-4' role="button" src={facebook} alt='Logo' width={30} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;