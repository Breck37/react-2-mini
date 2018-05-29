import React, { Component } from 'react';
import './App.css';
import products from './products';

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
    console.log(products)
    let productList = products.map((product, i) => {
      return (
        <div key={i}>
          <img src={product.picture} alt={product.name}/>
          <h1>{product.name}</h1>
          <h4>${product.price}</h4>
          <button id='btn'onClick={() => this.addProduct(product)}>Add to Cart</button>
        </div>
      )
    })

    let currentCart = this.state.cart.map((product, i) => {
      return (
        <div className="cart-item" key={i}>
          <span className="name">{product.name}</span>
          <span className="price">${product.price}</span>
        </div>
      )
    })
    return (
      <div className="App">
          <h1> DevMountain Shop </h1>
          
          {/* Display products here */}
          <div className="products">
            {productList}
          </div>

          {/* Create checkout section here */}

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
