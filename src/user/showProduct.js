import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { Input , Button,TextField  } from '@material-ui/core';
import AdminProduct from "../admin/adminProduct"
const ProductCard = styled.div`
   width:250px;
    height:350px;
    margin:10px;
    border-style: solid;
    border-width: 1px;
    padding:10px;
`;

const ProductListBox = styled.div`
    display:flex;
    flex-direction:row; 
    flex-wrap: wrap;
`

const Product = ({data,setSelectValue,number,token}) => (
    <ProductCard>
        <p>
            Name : {data.name}
        </p>
        <p>
            Cost : {data.cost} $
        </p>
        <p>
            Total : {data.total} ea.
        </p>
        <p>
            Type: {data.type}
        </p>
        {token!='false'?
        <Button onClick = {e => setSelectValue(number)}> Edit </Button>:
        <div></div>
        }
    </ProductCard>
)




const ShowProduct = (props) =>{ 
    const [productList,setProductList] = useState([])
    const [selectValue,setSelectValue] = useState(-1)
    const [reloadValue,setReloadValue] = useState(0)
    useEffect(() => {
        fetch("http://localhost:3010/listProduct")
        .then(response => response.json())
        .then(data => {setProductList(data.reverse())
                        console.log(data)
        })
    },[reloadValue])

    return (
        <ProductListBox >
            {props.token!='false'&&
            <AdminProduct token = {props.token} setReloadValue = {setReloadValue} reloadValue= {reloadValue} setSelectValue = {setSelectValue} mode = "0"/>
            }
            {
                productList.map((c,i) => i!=selectValue?<Product token = {props.token} data = {c} setSelectValue = {setSelectValue} number = {i} />
                :<AdminProduct token = {props.token} 
                            setReloadValue = {setReloadValue} 
                            reloadValue= {reloadValue} 
                            mode ="1" 
                            data ={c}
                            setSelectValue = {setSelectValue}
                            />
                )
            }
        </ProductListBox>


    )
}



export default ShowProduct