import user from '../Data/user'

const userReducer = function users(state = user, action){
    switch (action.type){
        case 'ADD_USER': return [...state, action.user]
        case 'ADD_LOAN': {
            var tempState = [...state];
            tempState[action.index] = action.updatedUser;
            return tempState;
        }
        case 'LOAD_USERS': return action.users
        default: return state
    }
}

export default userReducer