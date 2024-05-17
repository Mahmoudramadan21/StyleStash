import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions'
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';

function ProductEditScreen() {
    const { id } = useParams();
    const [name, setName] = useState("")
    const [describtion, setDescribtion] = useState("")
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [size, setSize] = useState("")
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (!product.id || product.id !== Number(id)) {
            dispatch(listProductDetails(id))
        } else {
            setName(product.name)
            setDescribtion(product.description)
            setCategory(product.categoryOfProduct)
            setType(product.typeOfProduct)
            setSize(product.sizeOfProduct)
            setPrice(product.price)
            setCount(product.countInStock)
            setImage(product.image)
        }
    }, [dispatch, id, product])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            id: product.id,
            name,
            describtion,
            category,
            type,
            size,
            price,
            count,
            image
        }))
        navigate(`/admin/products/`)
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://localhost:8000/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <div className="product-edit">
                <div className="container">
                <div className="container">
                    {loading ? <Loader /> :
                        error ? <ErrorComponent message={error} /> :
                        product.name ?
                        <>
                        <h1 className="heading">Edit Product</h1>
                        <form onSubmit={submitHandler}>
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    placeholder="Enter Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    placeholder="Enter Description"
                                    value={describtion}
                                    onChange={(e) => setDescribtion(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    placeholder="Enter Type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="size">Size</label>
                                <input
                                    type="text"
                                    id="size"
                                    placeholder="Enter Size"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="count">Count</label>
                                <input
                                    type="text"
                                    id="count"
                                    placeholder="Enter Count"
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={uploadFileHandler}
                                />
                            </div>
                            <div className="btn">
                                <button>Update</button>
                            </div>
                        </form>
                        </>
                        : <ErrorComponent message={`Product Not Found`} />
                    }

                    {loadingUpdate ? <><Loader /></> : errorUpdate ? <><ErrorComponent message={error} /></> : null}
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProductEditScreen;
