import React,{useState} from 'react';
import styled from 'styled-components';
import { Input , Button ,TextField  } from '@material-ui/core';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const LoginBar = styled.div`
    display:flex;
    flex-direction:row;
    margin:30px;
`



const Login  = ({token,...props}) =>{
    
    const [loginValue,setLoginValue] = useState({
        username:'',
        password:''
    })

    const updateLoginValue = e =>{
        setLoginValue({
            ...loginValue,
            [e.target.name]:e.target.value
        })
    }
    
    const loginClick = e => {
        console.log(loginValue)
        fetch("http://localhost:3010/login",{
            method: 'post',
            body:JSON.stringify(loginValue),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        })
        .then(response => response.text())
        .then(data => props.setToken(data))
    
    }

    
    return (
        <div>
        {token=="false"?
        <LoginBar>
           <TextField style ={{margin:"10px"}} name = "username" value = {loginValue.username} onChange = {updateLoginValue} label="username" placeholder ="admin"/>
            <TextField style ={{margin:"10px"}} name = "password" value = {loginValue.password} onChange = {updateLoginValue} label="password" placeholder ="123456"/>
            <Button onClick = {loginClick} >Login</Button>
        </LoginBar>:
        <LoginBar>
            <p>Login Complete</p>
            <Button onClick = {e => {props.setToken('false')}} >Log out</Button>
        </LoginBar>}
        </div>
    )
}

export default Login