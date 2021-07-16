import { userConstants } from '../constants';

const initialState = {
    items: [],
    totalElements: 0,
}

export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: [...state.items, ...action.posts.content],
                totalElements: action.posts.totalElements
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}