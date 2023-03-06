import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>)

export const useField = type => {
    const [value,setValue] = useState('')
    const onChange = event =>{
        setValue(event.target.value)
    }

    return{
        type,
        value,
        onChange,
    }
}