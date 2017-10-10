export const userSelector = state => state.user
export const usersSelector = state => state.user.entities.users
export const tokenSelector = state => state.user.token
export const authenticatedAtSelector = state => state.user.authenticatedAt
export const idSelector = state => state.user.id
export const loadingSelector = state => state.user.loading
export const errorSelector = state => state.user.error
