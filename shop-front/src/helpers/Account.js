import React from "react";
import Cookies from 'js-cookie';

class Account {

  static setToken(token, rememberMe) {
    if (rememberMe) localStorage.setItem('token', token);
     else Cookies.set('token', token);
  }

  static getToken() {
    return localStorage.getItem('token') || Cookies.get('token') ||  '';
  }

  static removeToken() {
    return localStorage.removeItem('token') || Cookies.remove('token')
  }

  static setAddress(data) {
    return localStorage.setItem('shippingAddress', JSON.stringify(data)) || {};
  }

  static getAddress() {
    return JSON.parse(localStorage.getItem('shippingAddress')) || {}
  }

}

export default Account;
