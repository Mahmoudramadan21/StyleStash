import axios from "axios";

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    MEN_PRODUCT_LIST_REQUEST,
    MEN_PRODUCT_LIST_SUCCESS,
    MEN_PRODUCT_LIST_FAIL,

    WOMEN_PRODUCT_LIST_REQUEST,
    WOMEN_PRODUCT_LIST_SUCCESS,
    WOMEN_PRODUCT_LIST_FAIL,

    CHILDREN_PRODUCT_LIST_REQUEST,
    CHILDREN_PRODUCT_LIST_SUCCESS,
    CHILDREN_PRODUCT_LIST_FAIL,

    COUPLES_PRODUCT_LIST_REQUEST,
    COUPLES_PRODUCT_LIST_SUCCESS,
    COUPLES_PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,

} from "../constants/productConstants"

export const listProducts = (q = "") => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const {data} = await axios.get(`http://localhost:8000/api/products?q=${q}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const menListProducts = (q) => async (dispatch) => {
    try {
        dispatch({ type: MEN_PRODUCT_LIST_REQUEST })

        const {data} = await axios.get(`http://localhost:8000/api/products/men?q=${q}`)
        dispatch({
            type: MEN_PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: MEN_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const womenListProducts = (q) => async (dispatch) => {
    try {
        dispatch({ type: WOMEN_PRODUCT_LIST_REQUEST })

        const {data} = await axios.get(`http://localhost:8000/api/products/women?q=${q}`)

        dispatch({
            type: WOMEN_PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: WOMEN_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const childrenListProducts = (q) => async (dispatch) => {
    try {
        dispatch({ type: CHILDREN_PRODUCT_LIST_REQUEST })

        const {data} = await axios.get(`http://localhost:8000/api/products/children?q=${q}`)

        dispatch({
            type: CHILDREN_PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CHILDREN_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const couplesListProducts = (q) => async (dispatch) => {
    try {
        dispatch({ type: COUPLES_PRODUCT_LIST_REQUEST })

        const {data} = await axios.get(`http://localhost:8000/api/products/unisex?q=${q}`)

        dispatch({
            type: COUPLES_PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: COUPLES_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:8000/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`http://localhost:8000/api/products/create/`,
        product,
        config)

        dispatch ({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`http://localhost:8000/api/products/delete/${id}/`,
        config)

        dispatch ({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            "headers": {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`http://localhost:8000/api/products/update/${product.id}/`,
        product,
        config)

        console.log(data)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    }

    catch(error) {
        console.log(error.response.data.detail)
        console.log(error.response && error.response.data.detail
            ? error.response.data.detail : error.message)
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}