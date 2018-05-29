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
                  <label><input type="radio" value='standard' onChange={e => this.toggleCheck(e.target.value)}/>Standard Shipping</label>
                  <label><input type="radio" value='expedited' onChange={e => this.toggleCheck(e.target.value)}/>Expedited Shipping ($5.00)</label>
                  <label><input type="checkbox"/>Gift Wrap ($10.00)</label>
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
