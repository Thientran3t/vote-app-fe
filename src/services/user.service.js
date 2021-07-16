import config from 'config';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAllPosts,
    getById,
    votePost,
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('userInfo', JSON.stringify(response));

            return response;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userInfo');
}

function getAllPosts(date, pageNumber) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const pageRequest = {page: pageNumber, size: 5}; 

    return fetch(`${config.apiUrl}/post?date=${date}&page=${pageRequest.page}&size=${pageRequest.size}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function votePost(requestData) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };

    return fetch(`${config.apiUrl}/post/vote`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}