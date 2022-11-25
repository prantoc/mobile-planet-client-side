import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { successToast } from '../../../../toast/Toaster';
import Loading from '../../../Shared/Loading/Loading';

const Category = () => {

    const [load, setLoad] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = process.env.REACT_APP_IMGBB_KEY;
    const { data: categories, isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch(`http://localhost:5000/category`, {
            headers: {
                authoraization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }).then(res => res.json())

    })

    const handleAddCategory = data => {
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
                    const { name } = data
                    const categoryImage = imgData.data.url
                    const category = {
                        categoryName: name,
                        categoryImage
                    }

                    const config = {
                        headers: {
                            'content-type': 'application/json',
                            authoraization: `bearer ${localStorage.getItem('mobile-planet')}`
                        }
                    }

                    axios.post('http://localhost:5000/add-category', category, config)
                        .then(res => {
                            if (res.data.acknowledged) {
                                successToast('Category Successfully Added !')
                                setLoad(false)
                                refetch()
                            }
                        })
                }
            })

    }


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <>
            <h3>Category</h3>
            {/* Add-category-form  */}
            <div className='shadow-lg p-3 my-3 bg-body rounded col-6 mx-auto'>
                <h4>Add a Category</h4>
                <form className='my-4' onSubmit={handleSubmit(handleAddCategory)}>
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
                            validate: {
                                lessThan10MB: (files) => files[0]?.size < 10000000 || "Max 10MB",
                                acceptedFormats: (files) =>
                                    ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type) ||
                                    "Only PNG, JPEG e GIF",
                            },
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

            <div className='shadow-lg p-3 my-3 bg-body rounded'>
                <h4 className='mb-5'>All Category</h4>
                <Table striped>
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>Category Name</th>
                            <th>Category Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 && categories?.map((cat, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>

                                <td>{cat.categoryName}</td>
                                <td>
                                    <Image roundedCircle style={{ height: '48px' }} src={cat.categoryImage} />
                                </td>
                                <td>
                                    <Button variant='danger'>Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default Category;