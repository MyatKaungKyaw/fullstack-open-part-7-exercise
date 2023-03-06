import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

ReactDOM.render(<App />, document.getElementById('root'))

export const useCountry = ctryName => {
    const {country,setCountry}=useState()

    useEffect(()=>{
        try{
            const countryRes = await axios.get(`https://restcountries.com/v3.1/name/${ctryName}?fullText=true`)
        }catch(err){
            console.error(err)
        }
    },[])
}