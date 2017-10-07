export default class Auth {
  static saveToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  static saveUser = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  static getToken = () => {
    return window.localStorage.getItem('token')
  }

  static getUser = () => {
    return JSON.parse(window.localStorage.getItem('user'))
  }

  static isLoggedIn = () => !!Auth.getToken()

  static destroyToken = () => {
    window.localStorage.removeItem('token')
  }
}
