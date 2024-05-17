import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../actions/productActions';
import Loader from '../components/Loader';

function ProductCreateScreen() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productCreate = useSelector(state => state.productCreate);
    const { loading, success, error } = productCreate;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        // Check if userInfo exists and user is admin, then continue
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        else if (success) {
            navigate('/admin/products');
        }
    }, [userInfo, navigate, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('type', type);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('count', count);

        dispatch(createProduct(formData));
    };



    return (
        <div>
            <div className="product-edit">
                <div className="container">
                    {loading ? <Loader /> :
                        (
                            <>
                                <h1 className="heading">Create Product</h1>
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="btn">
                                        <button disabled={loading} type="submit">Create</button>
                                    </div>
                                    {loading && <div>Loading...</div>}
                                    {error && <div>{error}</div>}
                                    {success && <div>Product created successfully!</div>}
                                </form>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ProductCreateScreen;
