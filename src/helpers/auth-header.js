export function authHeader() {
    // return authorization header with jwt token
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.accessToken) {
        return { 'Authorization': 'Bearer ' + userInfo.accessToken, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}