import React from 'react';
import { Button, Typography } from "material-ui";
import withStyles from 'material-ui/styles/withStyles';
import ProductCart from './ProductCart'
import CheckoutConfirmation from './partial/CheckoutConfirmation'


const Styles = theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            margin: '0% 0% 2% 5%'
        }
    },
    noItemsTypo: {
        [theme.breakpoints.up('md')]: {
            margin: '2% 29%'
        }
    }
})

const Cart = ({ products, total, onCheckoutClicked, removeFromCart, changeQty, classes, chekcoutDialog,
    handleCheckoutDialog, handleCheckoutSubmit }) => {
    const hasProducts = products.length > 0
    const nodes = hasProducts ? (
        products.map(product =>
            <ProductCart
                img={product.img}
                title={product.title}
                price={product.price}
                quantity={product.quantity}
                inventory={product.inventory}
                key={product.id}
                onQtySelected={(val) => changeQty(product.id, val)}
                onRemoveFromCartClicked={() => removeFromCart(product.id)}
            />
        )
    ) : (
            <Typography variant="title" color="error" className={classes.noItemsTypo}>Please add some products to cart.</Typography>
        )
    const reduceProductNeeds = products.length > 0 && products.reduce((all, item) => {
        all.push({
            id: item.id,
            image: item.img,
            title: item.title,
            price: item.price,
            quantity: item.quantity
        })
        return all
    }, [])
    return (
        <div className={classes.root}>
            <Typography variant="title" >Your Cart</Typography>
            <Typography variant="subheading" style={{ fontSize: '1.2rem', fontWeight: 500, marginTop: '1%' }}>Total: Rp {total}</Typography>
            {nodes}<br />
            <Button
                variant="raised"
                onClick={handleCheckoutDialog}
                disabled={hasProducts ? false : true}
                color="primary"
                style={{ color: '#fafafa' }}
            >
                Checkout
                </Button>
            <CheckoutConfirmation
                chekcoutDialog={chekcoutDialog}
                handleCheckoutSubmit={handleCheckoutSubmit}
                handleCheckoutDialog={handleCheckoutDialog}
                products={reduceProductNeeds}
                total={total}
            />
        </div>
    )
}
export default withStyles(Styles)(Cart)