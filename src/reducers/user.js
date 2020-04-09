
const INITIAL_STATE = {
  userInfo: {}
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USERINFO':
      return {
        ...state,
        userInfo: action.userInfo
      }
     default:
       return state
  }
}
