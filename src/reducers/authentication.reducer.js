import { userConstants } from '../constants';

let userInfo = JSON.parse(localStorage.getItem('userInfo'));
const initialState = userInfo ? { loggedIn: true, userInfo } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                userInfo: action.userInfo
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}