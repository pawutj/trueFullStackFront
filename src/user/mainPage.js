import React,{useState,useEffect} from 'react';
import { Input , Button } from '@material-ui/core';
import ShowProduct from "./showProduct.js"
import Login from './login.js'
import AdminProduct from '../admin/adminProduct.js'
const MainPage = (props) =>{

    const [token,setToken] = useState('false')

    return (
        <div>
            <Login setToken = {setToken} token ={token} />
            <ShowProduct  token = {token}/>
           
        </div>
    )
}

export default MainPage
