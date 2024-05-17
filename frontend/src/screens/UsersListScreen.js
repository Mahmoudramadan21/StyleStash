import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import { FaCheck, FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


function UsersListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        }
        else {
            const goToLoginPage = () => navigate('/login')
            goToLoginPage()
        }
    }, [dispatch, successDelete]);

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this user? "))
            dispatch(deleteUser(id))
    }

    return (
        <div className="users">
            <div className="container">
                <h1 className="heading">Users</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="content">
                        <table className='content-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th className='edit-del'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.isAdmin ? <FaCheck fill='#008000' style={{fontSize: "18px"}} /> : <FaX fill='#f00' style={{fontSize: "16px"}} />}
                                        </td>
                                        <td className='edit-del'>
                                            <Link to={`/user/${user.id}/`}>
                                                <FaEdit style={{fontSize: "22px"}}/>
                                            </Link>
                                            <a href={`/users/`}>
                                                <MdDelete onClick={() => deleteHandler(user.id)} style={{background: "red", marginLeft: "10px", fontSize: "22px"}} fill="#fff"/>
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

export default UsersListScreen;
