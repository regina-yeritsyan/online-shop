import Cookies from 'js-cookie';

class Account {

  static setToken(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      Cookies.set('token', token);
    }
  }

  static getToken() {
    return localStorage.getItem('token') || Cookies.get('token') ||  '';
  }
  static removeToken() {
    return localStorage.removeItem('token') || Cookies.remove('token');
  }

}

export default Account;
