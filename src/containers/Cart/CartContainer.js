import React, { Component } from 'react';
import { connect } from "react-redux";
import { checkout, removeFromCart, changeQty } from "../../actions";
import { getTotal, getCartProducts } from "../../reducers";
import Cart from '../../components/Cart'

class CartContainer extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
        };
    }
    handleOpenDialog = () => {
        this.setState({ open: !this.state.open });
    };
    handleCheckoutSubmit = () => {
        const { products, checkout } = this.props
        console.log('checkoutSubmit', products)
        const reduceProductNeeds = products.reduce((all, item) => {
            all.push({
                id: item.id,
                image: item.img,
                price: item.price,
                quantity: item.quantity
            })
            return all
        }, [])
        checkout(reduceProductNeeds)
        return this.setState({ open: !this.state.open })
    }
    render() {
        const { products, total, removeFromCart, changeQty } = this.props
        return (
            <Cart
                products={products}
                total={total}
                changeQty={(productId, val) => changeQty(productId, val)}
                removeFromCart={(productId) => removeFromCart(productId)}
                chekcoutDialog={this.state.open}
                handleCheckoutSubmit={this.handleCheckoutSubmit}
                handleCheckoutDialog={this.handleOpenDialog}
            />
        )
    }
}
const mapStateToProps = (state) => ({
    products: getCartProducts(state),
    total: getTotal(state)
})
export default connect(mapStateToProps, { checkout, removeFromCart, changeQty })(CartContainer)