import React, { Component } from 'react';
import { connect } from "react-redux";
import { CardActions, CardContent, Typography, Button, IconButton } from "material-ui";
import classnames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import { AddShoppingCart, RemoveShoppingCart, ExpandMore, Share } from "material-ui-icons";
import withStyles from 'material-ui/styles/withStyles';
import { addToCart } from '../../../actions';
const Styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    share: {
        [theme.breakpoints.up('md')]: {
            left: '69%',
        },
        [theme.breakpoints.down('md')]: {
            left: '21%',
        }
    },
    titleExpandedContent: {
        fontWeight: 500,
        fontSize: '1.2rem'
    }
})
class ActionDetails extends Component {
    constructor() {
        super()
        this.state = {
            detailsExpand: false
        }
    }

    expanding = () => this.setState({ detailsExpand: !this.state.detailsExpand })

    render() {
        const { inventory, id, classes, brand, details } = this.props
        return (
            <div>
                <CardActions>
                    <Button
                        onClick={(e) => this.props.addToCart(e, id)} disabled={inventory > 0 ? false : true}
                        size="small"
                        color="primary"
                    >
                        {inventory > 0 ? <AddShoppingCart /> : <RemoveShoppingCart />}
                        &nbsp;
            {
                            inventory > 0 ?
                                'Add To Cart'
                                : 'Sold Out'
                        }
                    </Button>
                    <IconButton
                        className={classes.share}
                    >
                        <Share />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.detailsExpand,
                        })}
                        onClick={this.expanding}
                        aria-expanded={this.state.detailsExpand}
                        aria-label="Show details"
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.detailsExpand} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="subheading" className={classes.titleExpandedContent}>
                            Product Details:
                      </Typography>
                        <Typography paragraph>
                            {details.map((item, idx)=><li key={idx}>{item}</li>)}
                        </Typography>
                        <Typography variant="subheading" className={classes.titleExpandedContent}>
                            Brand:
                      </Typography>
                        <Typography paragraph>
                            {brand}
                        </Typography>
                    </CardContent>
                </Collapse>
            </div>
        )
    }
}
export default withStyles(Styles)(connect(null, { addToCart })(ActionDetails))