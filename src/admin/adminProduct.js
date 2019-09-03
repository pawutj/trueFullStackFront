import React,{useState,useEffect} from 'react';
import { Input , Button ,InputLabel,MenuItem ,FormControl,Select,TextField  } from '@material-ui/core';
import styled from 'styled-components';

const AdminBox = styled.div`
    width:250px;
    height:350px;
    margin:10px;
    border-style: solid;
    border-width: 1px;
    padding:10px;
`

const StyledTextField = styled(TextField)`
    margin-left:auto;
    margin-right:auto;
    width:220px;
`

const AdminProduct = ({setReloadValue,setSelectValue,reloadValue,mode,data,...props}) => {
    const [dataInput,setDataValue] = useState({
            name:'',
            cost:'',
            total:'',
            type:'Fruits'
        })
    useEffect(() => {
        if(mode=="1"){
            setDataValue(data)
        }
    },[])
    
    const updateValue = e => {
        setDataValue({
            ...dataInput,
            [e.target.name]:e.target.value
        })
    }

    const updateValueLabel = e =>{
        setDataValue({
            ...dataInput,
            type:e.target.value
        })
    } 

    const AddEditProduct = e => {
        console.log(dataInput)
        const fetchString = mode==0?"addProduct":"editProduct"
        fetch(`http://localhost:3010/${fetchString}`,{ 
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': props.token
              },
            body:JSON.stringify(dataInput)

        }).then(response => {
                console.log(response.json())
                setReloadValue(reloadValue+1)
                setSelectValue(-1)
            }
    )}
            
    const DeleteProduct = e => {
        console.log(dataInput)
        fetch(`http://localhost:3010/deleteProduct`,{ 
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': props.token
              },
            body:JSON.stringify({
                id:data.id
            })

        }).then(response => {
                console.log(response.json())
                setReloadValue(reloadValue+1)
                setSelectValue(-1)
            
            }
    )
    }

    return (
     
        <AdminBox>
            {mode=="0"?<p>Add new Product</p>:<p>Edit Product</p>}
            <StyledTextField value = {dataInput.name} onChange={updateValue} name = "name" label="Name" placeholder ="Apple"/>
            <StyledTextField value ={dataInput.cost} onChange={updateValue} name = "cost" label ="Cost" placeholder ="$20"/>
            <StyledTextField value = {dataInput.total} onChange={updateValue} name = "total" label ="Total" placeholder ="100 ea."/>
            <StyledTextField  select
                label="Type"
                value = {dataInput.type}
                onChange={updateValueLabel}
        
            >
                <MenuItem value = "Fruits">Fruits</MenuItem>
                <MenuItem value = "Flower">Flower</MenuItem>
                <MenuItem value = "Seed">Seed</MenuItem>
            </StyledTextField>
            
  
            <Button style = {{marginTop:"10px"}} onClick = {AddEditProduct} >Add,Edit Product</Button>
            {mode =="1"&&
            <Button style = {{marginTop:"10px"}} onClick = {DeleteProduct} >Delete Product</Button>
            }
        
        </AdminBox>
      
    )
}

export default AdminProduct