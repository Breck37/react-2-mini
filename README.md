# Project Summary 

In this mini-project, we will expand upon the application we created during React-1. In doing so, we will create Reusable Stateless-Functional-Components, add options during checkout, validate inputs and cover the usage of ```props``` within React.


### Live Example
Click Me!

### Setup

```Fork``` and ```clone``` this repository.
```cd``` into the project directory.
Run ```npm install``` or ```yarn```
Run ```npm start``` or ```yarn start``` once install has finished.

## Step 1

### Summary

In this step, we are going to finish our setup by adding an npm package to be used towards the end of our project and also by setting up a few Components that we will be using to complete this project. The components include `ProductList`, `Button` and `DeleteBtn`.

### Instructions

* First, we will want to create a `Components` folder inside of our `src` folder.
* Then, inside the `Components` folder, create a file titled `ProductList.js`.
  * This component should be a stateless functional component that will need to take `props` as a parameter.
* Next, still inside the `Components` folder, we will create two more stateless functional components. 
  * The first is titled `Button` and the second will be titled `DeleteBtn`. 
  * Both of these components (functions) will need a `props` parameter.

### Solution

<details>
  <summary><code>src/Components/ProductList.js</code></summary>

```jsx
export default function ProductList(props){
  return (

  )
}
```
</details>

<details>
  <summary><code>src/Components/Button.js</code></summary>

```jsx
const Button = props => {
  return (

  )
}

export default Button;
```
</details>

<details>
  <summary><code>src/Components/DeleteBtn.js</code></summary>

```jsx
const DeleteBtn = props => {

}

export default DeleteBtn;
```
</details>

## Step 2

### Summary

In this step, we are going to clean up what we will not need from App.js, as well as making changes so we can use our new ProductList component in App.js

### Instructions

* To start, we will first import the `ProductList` component into `App.js`.
* Next, look for the `productList` and `currentCart` map variables inside the render and above the return. Once found, remove them. 
* Inside the div labeled `products`, replace the `productList` variable with our the `ProductList` component. (`<ProductList />`)
* In the ProductList tag, insert a `products` property set equal to the `products` variable from our import of `products.js`.
  * Also add a `showPicture` property set to `true` and an `add` property set to `this.addProduct`.

### Solution

<details>
  <summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from 'react';
import './App.css';
import products from './products';

// React 2
import ProductList from './Components/ProductList';

class App extends Component {
  constructor(){
    super();
    this.state = {
      cart: [],
      name: '',
      message: '',
      //React 2
      shipping: false,
      giftWrap: false,
      validZip: false,
    }
    this.updateName = this.updateName.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  // Create addProduct method here
  addProduct = product => {
    this.setState({
      cart: [...this.state.cart, product]
    })
  }

  // Create checkout method here
  checkout = () => {
    if(!this.state.name){
      this.setState({
        message: 'You must enter a name to continue. '
      })
    } else {
      this.setState({
        cart: [],
        name: '',
        message: 'Payment Successful!'
      })
    }
  }

  // Create calculateTotal method here
  calculateTotal(){
    return this.state.cart.map(e => {
      return e.price
    }).reduce((a, c) => a + c, 0)
  }

  // Create updateName method here
  updateName(event){
    this.setState({ name: event.target.value })
  }

  // React 2 changes

  // Create deleteItem method here
  deleteItem(product){
    let copy = this.state.cart.slice();
    let newCart = copy.filter(element => element !== product);
    this.setState({
      cart: newCart
    })
  }

  // Create toggleCheck method here
  toggleCheck = val => {
    if(val === 'standard'){
      this.setState({
        shipping: !this.state.shipping
      })
    } else if (val === 'expedited'){
      this.setState({
        shipping: true
      })
    } else {
      this.setState({
        giftWrap: !this.state.giftWrap
      })
    }
  }

  render() {

    return (
      <div className="App">

          <h1> DevMountain Shop </h1>

          <div className="products">
            <ProductList products={products} showPicture={true} add={this.addProduct}/>
          </div>


          <div className="checkout">
            <ProductList products={this.state.cart} showPicture={false} delete={this.deleteItem} />
            <div className="checkout-bottom">

              <div className='input-group'>
                <h3>Customer Information:</h3>
                <input className='input' type="text" onChange={this.updateName} placeholder='Enter name' value={this.state.name}/>
                <input className='input'  type="text" onChange={this.updateName} placeholder='Enter email' value={this.state.email}/>
                <input className='input'  type="text" onChange={this.updateName} placeholder='Enter zipcode' value={this.state.zipcode}/>

                <div className="checkout-options">
                  <label><input type="radio" value='standard' onChange={e => this.toggleCheck(e.target.value)} checked={!this.state.shipping}/>Standard Shipping</label>
                  <label><input type="radio" value='expedited' onChange={e => this.toggleCheck(e.target.value)} checked={this.state.shipping}/>Expedited Shipping ($5.00)</label>
                  <label><input type="checkbox" onClick={e => this.toggleCheck(e)} checked={this.state.giftWrap}/>Gift Wrap ($10.00)</label>
                </div>

              </div>

              <h1 className='total'>${this.calculateTotal()}</h1>

            </div>

            <button type='submit' onClick={this.checkout}>Confirm Payment</button>

            {this.state.message && <h4>{this.state.message}</h4>}
          </div>

      </div>
    );
  }
}

export default App;
```

## Step 3

### Summary

### Instructions

### Solution