import {createContext} from 'react'

const blogReducer = (state,action) => {
    switch(action.type){
        case 'set':{
            return [...action.blogs,]
        }
        default:{
            throw Error('unknon action : ',action.type)
        }
    }
}

const blogContext = createContext()

export const BlogContextProvider = (props) =>{
    const [blog,blogDispatch] = useReducer(blogReducer,[])
    return(
        <blogContext.Provider value={[blog,blogDispatch]}>
            {props}
        </blogContext.Provider>
    )
}