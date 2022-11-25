import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../../toast/Toaster';
import Loading from '../../../Shared/Loading/Loading';

const Category = () => {

    const [load, setLoad] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    // const { data: specialities, isLoading } = useQuery({
    //     queryKey: ['speciality'],
    //     queryFn: () => fetch(`https://doctors-portal-server-theta.vercel.app/appointmentSpeciality`, {
    //         headers: {
    //             authoraization: `bearer ${localStorage.getItem('doctor-portal')}`
    //         }
    //     }).then(res => res.json())

    // })

    const handleAddDoctor = data => {
        setLoad(true)
        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const { name, email, speciality } = data
                    const avatar = imgData.data.url
                    const doctor = {
                        name,
                        email,
                        speciality,
                        avatar
                    }

                    fetch(`https://doctors-portal-server-theta.vercel.app/addDoctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authoraization: `bearer ${localStorage.getItem('doctor-portal')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                successToast('Doctor Successfully Added !')
                                setLoad(false)
                            }
                        })

                }
            })

    }


    // if (isLoading) {
    //     return <Loading></Loading>
    // }


    return (
        <>
            <h3>Category</h3>
            <div className='shadow-lg p-3 my-3 bg-body rounded col-6 mx-auto'>
                <h4>Add a Category</h4>
                <form className='my-4' onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="mb-4">
                        <label htmlFor="exampleInputName" className="form-label">Category name</label>
                        <input {...register("name", {
                            required: { value: true, message: "Category name is required" },
                        })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.name ? "true" : "false"} />
                        {errors.name && <p className='text-danger fw-bold my-1' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="exampleInputImg" className="form-label">Category Image</label>
                        <input {...register("img", {
                            required: { value: true, message: "Profile Photo is required" },
                        })} type="file" className="form-control" id="exampleInputImg" aria-invalid={errors.img ? "true" : "false"} />
                        {errors.img && <p className='text-danger fw-bold my-1' role="alert">{errors.img?.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary text-center col-12  rounded">
                        <div>
                            {load
                                ?
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                <>Add a Category <FaArrowRight></FaArrowRight></>}
                        </div>
                    </button>
                </form>
            </div>
        </>
    );
};

export default Category;