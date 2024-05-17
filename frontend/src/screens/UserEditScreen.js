import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {getUserDetails, updateUser} from '../actions/userActions'

function UserEditScreen(match) {

    const { id } = useParams();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispitch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = useSelector(state => state.userUpdate)

    useEffect(() => {
        if(!user.username || user.id !== Number(id)){
            dispitch(getUserDetails(id))
        }
        else {
            setUsername(user.username)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, id, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispitch(updateUser({id: user.id, username, email, isAdmin}))
    }

    return (
        <div>
            <div className="user-edit">
                <div className="container">
                    <h1 className="heading">Edit User</h1>
                    <form onSubmit={submitHandler}>
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="isAdmin">
                            <input type="checkbox"
                                    id="isAdmin"
                                    checked= {isAdmin}
                                    onChange={(e) => setIsAdmin(true)}/>
                            <label htmlFor="isAdmin">isAdmin</label>
                        </div>
                        <div className="btn">
                            <button>Update</button>
                        </div>
                    </form>
                    {loadingUpdate ? <>{loadingUpdate}</> : errorUpdate ? <>{errorUpdate}</> :
                        successUpdate && (() => navigate(`/admin/users/`))()}


            </div>
            </div>
        </div>
    )
}

export default UserEditScreen
