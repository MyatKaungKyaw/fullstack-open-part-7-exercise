import { createContext, useContext, useReducer } from "react"

const UserReducer = (state,action) => {
    switch(action.type){
        case 'update' : return action.user
        case 'reset' : return null
        default :
            throw Error('unknown action : ',action.type)
    }
}

const UserContext = createContext()

export const UserContextProvider = props => {
    const [user,userDispatch] = useReducer(UserReducer,null)

    return(<UserContext.Provider value={[user,userDispatch]}>
        {props.children}
    </UserContext.Provider>)
}

export const useUserValue = () => useContext(UserContext)[0]

export const useUserDispatch = () => useContext(UserContext)[1]

export default UserContext