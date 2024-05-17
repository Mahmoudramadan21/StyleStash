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

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products};

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
}

export const menProductListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case MEN_PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};

        case MEN_PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products};

        case MEN_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
}

export const womenProductListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case WOMEN_PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};

        case WOMEN_PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products};

        case WOMEN_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
}

export const childrenProductListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case CHILDREN_PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};

        case CHILDREN_PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products};

        case CHILDREN_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
}

export const couplesProductListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case COUPLES_PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};

        case COUPLES_PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products};

        case COUPLES_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product: []}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const productCreateReducer = (state = {product: []}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_RESET:
            return {};

        default:
            return state;
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.payload) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};

        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success: true};

        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true};

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success:true};

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_UPDATE_RESET:
            return { product: {}};

        default:
            return state;
    }
}