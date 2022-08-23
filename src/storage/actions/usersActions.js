export const USERS_ACTIONS = {
   LOGOUT: 'LOGOUT',
   FETCH_AUTH_USER_SUCCESS: 'FETCH_AUTH_USER_SUCCESS',
}



export const logout = () => {
   return {
      type: USERS_ACTIONS.LOGOUT,
   }
}

export const fetchAuthUserSuccess = (user) => {
   return {
      type: USERS_ACTIONS.FETCH_AUTH_USER_SUCCESS,
      role: user.role,
      userName: user.username,
      token: user.token
   }
}
