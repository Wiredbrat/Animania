const serverUrl = "http://localhost:8000"
export const apiRoutes = {
  login : `${serverUrl}/api/v1/user/login`,
  logout: `${serverUrl}/api/v1/user/logout`,
  signUp: `${serverUrl}/api/v1/user/signup`,
  userInfo: `${serverUrl}/user/user-info`,
}