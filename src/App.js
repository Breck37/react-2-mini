import React, { Component } from 'react';
import './App.css';
import products from './products';

// React 2
import ProductList from './Components/ProductList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      email: '',
      zipcode: '',
    }
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  // Create addProduct method here
  addProduct = product => {
    this.setState({
      cart: [...this.state.cart, product]
    })
    toast.success(`${product.name} successfully added!`);
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
      let total = this.state.cart.map(e => {
        return e.price
      }).reduce((a, c) => a + c, 0)
      if(this.state.shipping){
        total += 5
      }
      if (this.state.giftWrap){
        total += 10
      }
      return total
    }

  // React 2 changes

  // Create deleteItem method here
  deleteProduct(product){
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
            <ToastContainer />

          

          <div className="products">
            <ProductList products={products} showPicture={true} add={this.addProduct}/>
          </div>


          <div className="checkout">
            <ProductList products={this.state.cart} showPicture={false} delete={this.deleteProduct} />
            <div className="checkout-bottom">

              <div className='input-group'>

                <h3>Customer Information:</h3>
                <input type="text" onChange={(event) => this.setState({name: event.target.value})} placeholder='Enter name' value={this.state.name}/>
                <input type="text" onChange={(event) => this.setState({email: event.target.value})} placeholder='Enter email' value={this.state.email}/>
                <input type="number" onChange={(event) => this.setState({zipcode: event.target.value})} placeholder='Enter ZipCode'/>

                {this.state.zipcode ? this.state.zipcode.length === 5 ? <i className="fas fa-check-circle" style={{color: 'green'}}>Zip Code Verified</i> : <i className="fas fa-times-circle" style={{color: 'red'}}>Zip Code Not Verified</i> : null}

                <div className="checkout-options">
                  <label>
                    <input type="radio" value='standard' onChange={e => this.toggleCheck(e.target.value)} checked={!this.state.shipping}/>
                      Standard Shipping
                  </label>

                  <label>
                    <input type="radio" value='expedited' onChange={e => this.toggleCheck(e.target.value)} checked={this.state.shipping}/>
                      Expedited Shipping ($5.00)
                  </label>

                  <label>
                    <input type="checkbox" onClick={e => this.toggleCheck(e)} checked={this.state.giftWrap}/>
                      Gift Wrap ($10.00)
                  </label>
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
