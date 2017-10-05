export default class Auth {
  static saveToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  static getToken = () => {
    return window.localStorage.getItem('token')
  }

  static isLoggedIn = () => !!Auth.getToken()

  static destroyToken = () => {
    window.localStorage.removeItem('token')
  }
}
