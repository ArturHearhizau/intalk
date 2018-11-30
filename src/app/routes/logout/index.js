import React, { Component } from 'react';
import Cookie from 'util/cookie';

window.testCookie = Cookie;

console.log(window);

export default class Logout extends Component {

  componentWillMount() {
    Cookie.deleteCookie('access_token');
    Cookie.deleteCookie('name');
    Cookie.deleteCookie('membership');
    Cookie.deleteCookie('email');
    location.href = 'http://vies.ninja';
  }

  render() {
    console.log(Cookie.getCookie('access_token'));
    return (
      <div>
        hello
      </div>
    );
  }
}
