import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography/Typography';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const CheckoutConfirmation = ({ chekcoutDialog, handleCheckoutDialog, handleCheckoutSubmit, products, total }) => (
    <Dialog
        open={chekcoutDialog}
        transition={Transition}
        keepMounted
        onClose={handleCheckoutDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">
            Are you sure want to checkout ?
        </DialogTitle>
        <DialogContent id="alert-dialog-slide-description">
            {
                products && products.map(product => (
                    <div key={product.id}>
                        <Typography> <b>Brand:</b> {product.title}</Typography>
                        <Typography><b>Price:</b> Rp {product.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Typography>
                        <Typography><b>Quantity:</b> {product.quantity}</Typography>
                        <br />
                    </div>
                ))
            }
            <Typography variant="body2" style={{ fontWeight: 500, fontSize: '1.2rem' }}>Total: Rp {total}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCheckoutDialog} color="primary">
                Cancel
            </Button>
            <Button onClick={handleCheckoutSubmit} color="primary">
                Checkout
            </Button>
        </DialogActions>
    </Dialog>
);

export default CheckoutConfirmation;