import React from 'react'
import Button from './Button'
import DeleteBtn from './DeleteBtn'

export default function ProductList(props){
    console.log(props)
    let list = props.products.map((product, i) => {
        return (
            <div key={i}>
                <ul className='list'>
                    {props.showPicture && <img src={product.picture} alt={product.name}/>}
                    <li><b>{product.name}</b></li>
                    <br/>
                    <li>${product.price}</li>
                    <br/>
                    {props.add ? <Button text='Add to Cart' params={product} action={props.add} /> : <DeleteBtn action={() => props.delete(product)} text='Delete' />}
                </ul>
            </div>
        )
    })
    return list
}