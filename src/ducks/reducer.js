const initialState = {
    username: '',
    id: 0,
    profile_pic: ''
}

// consts
const GET_USER = 'GET_USER'

// action builders
export function getUser(userInfo) {
    return {
        type: GET_USER,
        payload: userInfo
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            const {username, id, profile_pic} = action.payload
            return {...state, username, id, profile_pic}
        default: return state
    }
}