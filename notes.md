React 2 changes

# Step 1
`Setup`
* Add glyphicons package `yarn add glyphicons`
* Create a Components folder
* Create ProductList Functional component (Import to App.js)
`export default function ProductList(props){}`
* Create Button Functional Component (Import to ProductList.js)
`const Button = props => {}`
* Create DeleteBtn Functional Component (Import to ProductList.js)
`const DeleteBtn = props => {}`

# Step 2
`src/App.js`
* Remove Product and Cart map from App.js (Inside render)
* Remove {productList} variable (Inside return), replacing them with ProductList component
* Inside the products div, add a `products` property to <ProductsList /> set equal to the products variable import. 
    * Also include a `showPicture` property set to true and a `add` property set to `this.addProduct`.

# Step 3
`src/Components/ProductList.js`
* Inside the ProductList component, create a map on the products prop set to a `list` variable. Inside the maps return statement, create an outer `div` with a `<ul className='list'>` inside of it. 
* Inside the `ul` use curly braces to break out of the JSX, here we are going to create a statement depends on the `showPicture` prop. If it's truthy, we want to render the product image first. 
`{props.showPicture && <img src=''>}`
* Next, we want to create an `li` tag with an inner `b` tag containing the products name.
* Next, we want to create another li tag containing the item price. (Include $ in instructions?)
* Lastly, use curly braces again to create a ternary that checks if we were passed an `add` prop. If so, we will render our Button component, passing the `add`function as an action prop or property, `Add to Cart` as a text prop and passing the entire `product` as a param prop. If not, just put `null`.

# Step 4
`src/Components/Button.js`
* Inside the return statement of our Button function, create an outer `div` and inside create a `button` tag with an `onClick` callback that uses the action prop invoked with the param prop. Between your opening button tag and your closing button tag, use curly braces to access the `text` prop.

<details>

```jsx
import React from 'react';

const Button = props => {
    return (
        <div>
            <button onClick={() => props.action(props.params)}>{props.text}</button>
        </div>
    )
}

export default Button;
```
</details>

# Step 5
`src/App.js`
* In App.js, locate the `currentCart` variable and remove it. In it's place, lets create another `<ProductList />` tag passing a products prop set to `this.state.cart`, the showPicture prop we used previously set to false, and a `delete` prop set to `this.deleteItem` (which we will create in the next step) with the product. 
* Above the render, create a deleteItem method that takes in a product as a parameter. 
* Inside the deleteItem method, lets make a copy of our current cart using `.slice()`. Then, create a variable `newCart` set to a `.filter()` through the cart copy that only returns items not the same as the product passed in. 
* Then `setState()` on the `cart` property using the `newCart` variable.
* Lastly, make sure to bind this method. 

# Step 6
`src/Components/ProductList.js`
* At the top of our component, import our newly created `DeleteBtn` component.
* Locate the ternary that depends on the `add` prop. In the false position of the ternary, render the `DeleteBtn` tag passing an `action` prop set a callback that invokes the delete function with the `product` and a `text` prop set to `delete`.

# Step 7
`src/Components/DeleteBtn.js`
* Inside the return of our functional component, create a `span` tag with an `onClick` set to our action prop.
* Inside the span tag, use curly braces to render our text prop. 

# Step 8
`src/App.js`
* Now we are going to update our checkout options and we will start by putting three new properties in our state object, `shipping`, `giftWrap` and `validZip` - setting all to false. 
* Next, below the deleteItem method, create a toggleCheck arrow function that takes in the `event.target.value` as `val`
`toggleCheck = val => {}`
* Inside the method, create a conditional that tests if `val` is equal to `standard`, if it is - `setState` of `shipping` to be the opposite of what it is.
* Else if its not equal to shipping, test if it is equal to `expedited` and if so, `setState` of shipping to `true`.
* Lastly, in the else portion of our conditional, `setState` of `giftWrap` to be opposite of what it currently is. 

# Step 9

//SWITCH UPDATE NAME TO HANDLEUSERINPUT?


# Step 10

* Locate the first `div` inside our `checkout-bottom` div that contains the `name` input and give that div a className of `input-group` 
* Below the `name` input, create two more inputs, one for email and the other for zipcode. (Copy all properties from the name input and update them to reflect the new value for the new inputs)
* Below the zipcode input, lets create a ternary that checks if there is a validZip (using `this.state`). If there is, leave a message that states 'Zipcode verified', else leave 'Zipcode not verified'. 
* Still inside the `input-group` div, create another div with the id of `confirm`.
* Inside `confirm`, create an inner `div` with the className of `checkout-options`. Inside this div, we will create three labels. Inside each label will be an input.
* This first `<label><input />` will be for `Standard shipping` which means we will give the input a type of `radio`, a value property set to `standard` an onChange set to a callback that takes in the event and invokes `this.toggleCheck` using the event.target.value. We will repeat this step for the second `<label><input />` which will be for `Expedited ($5.00)` shipping, with a value property set to `expedited`. 
* The third `<label><input />` will be for our `Gift Wrap ($10.00)` option. The type of this input will be `checkbox` and it will also have an `onChange` property for the `toggleCheck` method.

# Step 11

