import React,{useState} from 'react';
import { Input , Button } from '@material-ui/core';
import AdminProduct from "../admin/adminProduct"
const Product = (props) => {
    const [dataInput,setDataValue] = useState({
            name:'',
            cost:'',
            total:'',
            type:''
        })

    const updateValue = e => {
        setDataValue({
            ...dataInput,
            [e.target.name]:e.target.value
        })
    }

    const AddProductToCart = e => {
        console.log(dataInput)
    }
            

    return (
        <div>
          <Input value = {dataInput.name} onChange={updateValue} name = "name" />
          <Input value ={dataInput.cost} onChange={updateValue} name = "cost" />
          <Input value = {dataInput.total} onChange={updateValue} name = "total" />
          <Button onClick = {AddProductToCart} >Add Product to Cart</Button>
        </div>
    )
}

export default Product