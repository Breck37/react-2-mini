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

* First, run `yarn add glyphicons` or `npm install glyphicons`.
* While that package is downloading, create a `Components` folder inside of our `src` folder.
* Then, inside the `Components` folder, create a file titled `ProductList.js`.
  * This component should be a stateless functional component that will need to take `props` as a parameter.
* Next, still inside the `Components` folder, we will create two more stateless functional components. 
  * The first is titled `Button` and the second will be titled `DeleteBtn`. 
  * Both of these components (functions) will need a `props` parameter.

### Solution

<details>
  <summary><code>src/Components/ProductList.js</code></summary>

```jsx
import React from 'react'

export default function ProductList(props){
  
}
```
</details>

<details>
  <summary><code>src/Components/Button.js</code></summary>

```jsx
import React from 'react'

const Button = props => {
  
}

export default Button;
```
</details>

<details>
  <summary><code>src/Components/DeleteBtn.js</code></summary>

```jsx
import React from 'react'

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
* Now, down in the return, find the div labeled `products` and replace the `productList` variable with our the `ProductList` component. (`<ProductList />`)
* In the ProductList tag, insert a `products` property set equal to the `products` variable from our import of `products.js`.
  * Also add a `showPicture` property set to `true` and an `add` property set to `this.addProduct`.

### Solution

<details>
  <summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from 'react';
import './App.css';
import products from './products';

// REACT 2 
import ProductList from './Components/ProductList.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      cart: [],
      name: '',
      message: ''
    }
    this.updateName = this.updateName.bind(this)
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

  render() {
   
    return (
      <div className="App">
          <h1> DevMountain Shop </h1>
          
          {/* Display products here */}
          <div className="products">
            <ProductList products={products} showPicture={true} add={this.addProduct}/>
          </div>

          <div className="checkout">

            {currentCart}

            <div className="checkout-bottom">

              <div>

                <input type="text" onChange={this.updateName} placeholder='Enter name' value={this.state.name}/>

              </div>

              <h1>${this.calculateTotal()}</h1>

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

</details>

## Step 3

### Summary

In this step, we are going to build out our ProductList Component to handle the props that are being passed in. Please note that we want to create this component in a way that we can reuse it.

### Instructions

* Open `src/Component/ProductList.js`
* Firstly, we will need to use our `Button` component inside of this Component, so lets import `Button` right underneath where we imported `React`.
* Inside the ProductList function, create a map on the products prop set to a `list` variable. Inside the maps return statement, create an outer `div` with a `<ul className='list'>` inside of it. 
* Inside the `ul` use curly braces to break out of the JSX, here we are going to create a statement that depends on the `showPicture` prop. If it's truthy, we want to render the product image using an img tag. 
`{props.showPicture && <img src=''>}`
* Next, we want to create an `li` tag with an inner `b` tag containing the products name, make sure to use the `break` tag or `<br/>` afterwards. 
* Next, we want to create another `li` tag containing the item price, also including a `break` tag afterwards. (Include $ in instructions?)
* Lets finish our map by using curly braces again to test the truthiness of the `add` prop. If its truthy, we will render our Button component, passing the `add` function as an action prop or property, `Add to Cart` as a text prop and passing the entire `product` as a param prop.
* Lastly, return the `list` variable below the map but still inside our `ProductList` function.

### Solution

<details>
  <summary><code>src/Components/ProductList.js</code></summary>

```jsx
import React from 'react'
import Button from './Button'

export default function ProductList(props){
    let list = props.products.map((product, i) => {
      return (
        <div key={i}>
            <ul className='list'>
              {props.showPicture && <img src={product.picture} alt={product.name} />}
              <li><b>{product.name}</b></li>
              <br/>
              <li>${product.price}</li>
              <br/>
              { props.add && <Button action={props.add} text='Add to Cart' param={product}/> }
            </ul>
        </div>
      )
    })
  return list
}
```
</details>

## Step 4

### Summary

In this step, we will build out the `Button` component so that it can successfully receive and use the props being passed to it by `ProductList`.

### Instructions

* Inside the return statement of our Button function, create an outer `div` and inside create a `button` tag with an `onClick` callback that uses the action prop invoked with the param prop. 
* Between your opening button tag and your closing button tag, use curly braces to access the `text` prop.

### Solution
<detail>
  <summary><code>src/Components/Button</code></summary>

```jsx
import React from 'react'

const Button = props => {
  return (
    <div>
      <button onClick={() => props.action(props.param)}>{props.text}</button>
    </div>
  )
}

export default Button;
```
</details>

## Step 5

### Summary

In this step, we will use the `ProductList` component for our cart display, as well as creating a `deleteProduct` method so that users can remove items from the cart.

### Instructions

* Open `src/App.js`
* Locate the `currentCart` variable within the App return and remove it. In it's place, lets create another `<ProductList />` tag with a `products` property set to `this.state.cart`, the `showPicture` prop set to `false`, and a `delete` prop set to `this.deleteProduct`.
* Above the render, create a `deleteProduct` method that takes in a `product` parameter. 
* Inside the deleteProduct method, lets make a copy of our current cart using `.slice()` and save it to a variable titled `cartCopy`. Then create a variable `newCart` set to filter through the cart copy that only return items that are not equal to the product that was passed in.
* After the filter, call `setState` on the `cart` property and set it to the `newCart` variable.
* Lastly, make sure to call `bind` on this method from within the constructor. (This allows the method to maintain the context of `this`)

### Solution

<details>
  <summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from 'react';
import './App.css';
import products from './products';

// REACT 2 
import ProductList from './Components/ProductList.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      cart: [],
      name: '',
      message: ''
    }
    this.updateName = this.updateName.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
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

  // Create deleteProduct method here
  deleteProduct(product){
    let cartCopy = this.state.cart.slice();
    let newCart = cartCopy.filter(element => element !== product);
    this.setState({
      cart: newCart
    })
  }

  render() {
   
    return (
      <div className="App">
          <h1> DevMountain Shop </h1>
          
          {/* Display products here */}
          <div className="products">
            <ProductList products={products} showPicture={true} add={this.addProduct}/>
          </div>

          <div className="checkout">

            <ProductList products={this.state.cart} showPicture={false} delete={this.deleteProduct} />

            <div className="checkout-bottom">

              <div>

                <input type="text" onChange={this.updateName} placeholder='Enter name' value={this.state.name}/>

              </div>

              <h1>${this.calculateTotal()}</h1>

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

</details>

## Step 6

### Summary

In this step, we will update our ProductList component to use the `DeleteBtn` component, as well as building out the `DeleteBtn` component in order to use the `deleteProduct` function that was passed from `App.js`

### Instructions

* Open `src/Components/ProductList.js`
* At the top of our component, import the `DeleteBtn` component.
* Locate the statement that depends on `add` prop and remove the `&&` by replacing it with a `?`.
* Here we are going to create a ternary so that if the `add` prop is truthy, it will render the `Button` component that we already set up and if it's falsy, it will render the `DeleteBtn` instead.
* To finish the ternary, add a `:` after the `Button` component and then render the `DeleteBtn` tag passing an `action` property set to a callback that invokes the `delete` prop with the `product` and a `text` prop set to `delete`.
* Next, open `src/Components/DeleteBtn.js`.
* Inside the return of our functional component, create a `span` tag with an `onClick` set to our `action` prop.
* Between the opening and closing `span` tag, use curly braces to access our `text` prop.

### Solution

<details>
  <summary><code>src/Components/ProductList.js</code></summary>

```jsx
import React from 'react'
import Button from './Button'
import DeleteBtn from './DeleteBtn'

export default function ProductList(props){
    let list = props.products.map((product, i) => {
      return (
        <div key={i}>
            <ul className='list'>
              {props.showPicture && <img src={product.picture} alt={product.name} />}
              <li><b>{product.name}</b></li>
              <br/>
              <li>${product.price}</li>
              <br/>
              { props.add ? <Button action={props.add} text='Add to Cart' param={product}/> :  <DeleteBtn action={() => props.delete(product)} text='delete' />}
            </ul>
        </div>
      )
    })
  return list
}
```
</details>

<details>
  <summary><code>src/Components/DeleteBtn.js</code></summary>

```jsx
import React from 'react'

const DeleteBtn = props => {
  return (
    <span onClick={props.action}>
      {props.text}
    </span>
  )
}

export default DeleteBtn;
```
</details>

## Step 7

### Summary

In this step, we will initialize some new properties on state that will be used for some checkout options we will be creating for the user, as well as deleting our current `updateName` method.

### Instructions

* Open `src/App.js`
* Locate the App components state object and insert three new properties: `shipping`, `giftWrap` and `validZip` setting all of them to `false` and two more properties for our future inputs: `email` and `zipcode` setting both to an empty string.
* Next, below the `deleteProduct` method, create a `toggleCheck` arrow function that takes in a parameter called `val`.
* Inside the method, create a conditional that tests if `val` is equal to `standard`, if it is - call `setState` of `shipping` to be `false`. If it is not, `standard`, continue your conditional to test if `val` is equal to `expedited` and if so, call `setState` to change `shipping` to `true`
* Next, in the `else` portion of our conditional, `setState` of `giftWrap` to be the opposite of what it currently is (think bang operator).
* Now, locate the method we created yesterday call `updateName` and remove it. 
  * Go ahead and remove the bind statement as well.


### Solution

<details>
  <summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from 'react';
import './App.css';
import products from './products';

// REACT 2 
import ProductList from './Components/ProductList.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      cart: [],
      name: '',
      message: '',
      // React 2
      shipping: false,
      giftWrap: false,
      validZip: false,
      email: '',
      zip: '',
    }
    this.handleUserInput = this.handleUserInput.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
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

  // Create deleteProduct method here
  deleteProduct(product){
    let cartCopy = this.state.cart.slice();
    let newCart = cartCopy.filter(element => element !== product);
    this.setState({
      cart: newCart
    })
  }

  toggleCheck = val => {
    if(val === 'standard'){
      this.setState({
        shipping: false,
      })
    } else if (val === 'expedited'){
      this.setState({
        shipping: true,
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
          
          {/* Display products here */}
          <div className="products">
            <ProductList products={products} showPicture={true} add={this.addProduct}/>
          </div>

          <div className="checkout">

            <ProductList products={this.state.cart} showPicture={false} delete={this.deleteProduct} />

            <div className="checkout-bottom">

              <div>

                <input type="text" onChange={this.updateName} placeholder='Enter name' value={this.state.name}/>

              </div>

              <h1>${this.calculateTotal()}</h1>

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

</details>

## Step 8

### Summary

In this step, we are going to create another new method to handle user input for different fbuild our checkout section in `App.js` to include some additional options for our user.

### Instructions

* Open `src/App.js`
* Locate the first `div` inside our `checkout-bottom` div that contains the `name` input and give it a className of `input-group`.
* Now, we will update the `onChange` property on the `name` input to a callback that calls `setState` and sets `name` to the `event.target.value`.
* Next, below the `name` input, create two more inputs, one for `email` and the other for `zipcode`. 
  * Copy all properties from the name input and update their values to reflect the new inputs: (`className`, `onChange`, `placeholder` & `value`)

### Solution

<details>
  <summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from 'react';
import './App.css';
import products from './products';

// REACT 2 
import ProductList from './Components/ProductList.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      cart: [],
      name: '',
      message: '',
      // React 2
      shipping: false,
      giftWrap: false,
      validZip: false,
    }
    this.updateName = this.updateName.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
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

  // Create deleteProduct method here
  deleteProduct(product){
    let cartCopy = this.state.cart.slice();
    let newCart = cartCopy.filter(element => element !== product);
    this.setState({
      cart: newCart
    })
  }

  toggleCheck = val => {
    if(val === 'standard'){
      this.setState({
        shipping: false,
      })
    } else if (val === 'expedited'){
      this.setState({
        shipping: true,
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
          
          {/* Display products here */}
          <div className="products">
            <ProductList products={products} showPicture={true} add={this.addProduct}/>
          </div>

          <div className="checkout">

            <ProductList products={this.state.cart} showPicture={false} delete={this.deleteProduct} />

            <div className="checkout-bottom">

              <div>

                <input type="text" onChange={() => this.setState({name: event.target.value})} placeholder='Enter name' value={this.state.name}/>
                <input type="text" onChange={() => this.setState({email: event.target.value})} placeholder='Enter email' value={this.state.email}/>
                <input type="text" onChange={() => this.setState({zipcode: event.target.value})} placeholder='Enter ZipCode' value={this.state.zipcode}/>

              </div>

              <h1>${this.calculateTotal()}</h1>

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

</details>

## Step 8

### Summary

In this step, we are going to update our checkout section by creating a method to handle the different checkout options we just created for the user.

### Instructions

### Solution

## Step 9

### Summary

### Instructions

### Solution

## Step 10

### Summary

### Instructions

### Solution

## Step 11

### Summary

### Instructions

### Solution

## Step 12

### Summary

### Instructions

### Solution