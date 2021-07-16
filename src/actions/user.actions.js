import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllPosts,
    votePost,
};

function login(email, password, from) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                response => { 
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(userInfo) { return { type: userConstants.LOGIN_SUCCESS, userInfo } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllPosts(date, pageNumber) {
    return dispatch => {
        dispatch(request());

        userService.getAllPosts(date, pageNumber)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(posts) { return { type: userConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function votePost(requestData) {
    return dispatch => {
        dispatch(request());

        userService.votePost(requestData)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.VOTE_REQUEST } }
    function success(post) { return { type: userConstants.VOTE_SUCCESS, post } }
    function failure(error) { return { type: userConstants.VOTE_FAILURE, error } }
}
