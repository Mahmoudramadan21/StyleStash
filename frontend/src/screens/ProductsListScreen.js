import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts } from '../actions/productActions';
import { FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';


function ProductsListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        }
        else {
            const goToLoginPage = () => navigate('/login')
            goToLoginPage()
        }
    }, [dispatch, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this user? "))
            dispatch(deleteProduct(id))
    }

    return (
        <div className="products-admin">
            <div className="container">
                <div className="head">
                    <h1 className="heading">Products</h1>
                    <Link to={`/admin/product/create/`}>
                        <div className="add-product">
                            <FaPlus fill='#fff'/>
                            <h4>Add Product</h4>
                        </div>
                    </Link>

                </div>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <ErrorComponent message={error} />
                ) : (
                    <div className="content">
                        <table className='content-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th className='edit-del'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.categoryOfProduct}</td>
                                        <td>{product.typeOfProduct}</td>
                                        <td className='edit-del'>
                                            <Link to={`/admin/product/${product.id}/`}>
                                                <FaEdit style={{fontSize: "22px"}}/>
                                            </Link>
                                            <a href={`/admin/products/`}>
                                                <MdDelete onClick={() => deleteHandler(product.id)} style={{background: "red", marginLeft: "10px", fontSize: "22px"}} fill="#fff"/>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </div>
    );
}

export default ProductsListScreen;
