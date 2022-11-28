import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../../assets/login/google.png'
import facebook from '../../../assets/login/facebook.png'
import github from '../../../assets/login/github.png'
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider';
import { errorToast, successToast } from '../../../toast/Toaster';
import { useToken } from '../../../hooks/useToken';
import useTitle from '../../../hooks/useTitle';
const SignUp = () => {
    useTitle('SignUp')
    const { signInWithEmailPass, loading, setLoading, updateUserData, signInByGoogle } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createdEmail, setCreatedEmail] = useState('')
    const token = useToken(createdEmail);
    const navigate = useNavigate();
    if (token) {
        navigate('/')
    }
    //? Signup function
    const handleSignUp = data => {
        setLoading(true)
        const { name, email, password, type } = data
        const user = {
            name,
            email,
            role: type,
            verified: false
        }
        signInWithEmailPass(email, password)
            .then(() => {
                updateUserData(name)
                    .then(() => {
                        saveUser(user)
                    }).catch((error) => {
                        errorToast(error)
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                errorToast(errorMessage)
                setLoading(false)
            });
    }
    //? Google sign in 
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
                successToast(`Hi,${userData.displayName}  You Logged in successfully`);
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
                    setCreatedEmail(user.email)
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
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <h1 className='text-center pb-2'>SignUp</h1>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                            <input {...register("name", { required: "Name is required" })} placeholder="Your full name" className="form-control" id="exampleInputName" aria-invalid={errors.name ? "true" : "false"} />
                            {errors.name && <p className='text-danger fw-bold my-1' role="alert">{errors.name?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" {...register("email", {
                                required: { value: true, message: "Email Address is required" },
                                // pattern: {
                                //     value: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/,
                                //     message: "I think I said _valid_, didn't I?"
                                // }
                            })} aria-invalid={errors.email ? "true" : "false"} className="form-control" id="exampleInputEmail1" placeholder='Enter your email ' />
                            {errors.email && <p className='text-danger fw-bold my-1' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" {...register("password", {
                                required: "Password Address is required",
                                minLength: { value: 6, message: 'Password must be 6 characters!' }
                            })} aria-invalid={errors.password ? "true" : "false"} className="form-control" id="exampleInputPassword1" placeholder='Enter your password' />
                            {errors.password && <p className='text-danger fw-bold my-1' role="alert">{errors.password?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Select Account Type</label>
                            <div>
                                <Form.Check
                                    inline
                                    label="Buyer"
                                    name="type"
                                    type='radio'
                                    id='buyer'
                                    value="buyer"
                                    {...register("type", {
                                        required: "Account type is required"
                                    })}

                                    aria-invalid={errors.type ? "true" : "false"}
                                />
                                <Form.Check
                                    inline
                                    label="Seller"
                                    name="type"
                                    type='radio'
                                    id='seller'
                                    value="seller"
                                    {...register("type", {
                                        required: "Account type is required"
                                    })}
                                    aria-invalid={errors.type ? "true" : "false"}
                                />
                            </div>
                            {errors.type && <p className='text-danger fw-bold my-1' role="alert">{errors.type?.message}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary text-center col-12  rounded">

                            {loading
                                ?
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                <>SignUp <FaArrowRight></FaArrowRight></>}
                        </button>
                    </form>


                    <div className="form-text text-center p-2 mt-3">Have an account? <Link to="/login">Login</Link></div>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <img className='m-4' role="button" src={google} onClick={googleSignIn} alt='Logo' width={30} />
                        <img className='m-4' role="button" src={github} alt='Logo' width={30} />
                        <img className='m-4' role="button" src={facebook} alt='Logo' width={30} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;