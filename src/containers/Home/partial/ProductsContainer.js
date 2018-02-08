import React from 'react';
import { connect } from "react-redux";
import { createSelector } from 'reselect'
import { Link } from "react-router-dom";
import { addToCart, seeDetail } from "../../../actions";
import { getVisibleProducts } from "../../../reducers/products";
import { AddShoppingCart, RemoveShoppingCart } from "material-ui-icons";
import { Button, Typography, Grid, Avatar } from "material-ui";
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import GridList from 'material-ui/GridList/GridList';
import red from 'material-ui/colors/red';
import withStyles from 'material-ui/styles/withStyles';

const Styles = theme => ({
    root: { flexGrow: 1 },
    gridListRoot: {
        [theme.breakpoints.up('md')]: {
            padding: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        }
    },
    gridList: { overflowX: 'hidden' },
    card: {
        maxWidth: 310,
        minWidth: 310,
        [theme.breakpoints.up('md')]: {
            margin: '24px',
        },
        [theme.breakpoints.down('md')]: {
            margin: '5px 10px',
            overflow: 'hidden'
        }
    },
    media: { height: 200 },
    avatar: { backgroundColor: red[500], },
    gridTypeItem: {
        [theme.breakpoints.up('md')]: {
            padding: 12,
            margin: -21
        }
    },
    titleLink: { textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', color: 'black' }
})
const ProductsContainer = ({ products, addToCart, seeDetail, classes }) => {
    const splittingTitle = title => {
        const splitted = title.split(' ')
        return title.length >= 35 ? splitted[0] + ' ' + splitted[1] + ' ' + splitted[2] + '....' : title
    }
    return (
        <Grid container className={classes.root}>
            <div className={classes.gridListRoot}>
                <GridList cellHeight={450} classes={{ root: classes.gridList }}>
                    <Grid item xs={12}>
                        <Grid container spacing={24} justify="center">
                            {
                                products.map(product => (
                                    <Grid item key={product.id} classes={{ typeItem: classes.gridTypeItem }}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                                        R
                                            </Avatar>
                                                }
                                                title={<Link className={classes.titleLink} to={`/detail/${product.id}`} onClick={() => seeDetail(product.id)}>
                                                    {splittingTitle(product.title)}
                                                </Link>}
                                                subheader={(new Date()).toLocaleDateString()}
                                            />
                                            <Link to={`/detail/${product.id}`} onClick={() => seeDetail(product.id)}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={product.img}
                                                    title={product.title}
                                                />
                                            </Link>
                                            <CardContent>
                                                <Typography component="p">
                                                    Available Stock: {product.inventory}
                                                </Typography>
                                                <Typography component="p">
                                                    Price: Rp.{product.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    onClick={(e) => addToCart(e, product.id)} disabled={product.inventory > 0 ? false : true}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    {product.inventory > 0 ? <AddShoppingCart /> : <RemoveShoppingCart />}
                                                    &nbsp;
                                            {
                                                        product.inventory > 0 ?
                                                            'Add To Cart'
                                                            : 'Sold Out'
                                                    }
                                                </Button>
                                                <Button
                                                    component={Link}
                                                    to={`/detail/${product.id}`}
                                                    color="primary"
                                                >
                                                    Details
                                        </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </GridList>
            </div>
        </Grid>

    )
}
/* Memoized Algorithm to be not multiple rendering and requesting to the API and just use the previous cached data whenever the user changed something on the view or make some actions to it */
const selectMemoizedProducts = createSelector(
    state => getVisibleProducts(state.products),
    products => products
)

const mapStateToProps = state => {
    return {
        products: selectMemoizedProducts(state)
    }
}


export default withStyles(Styles)(connect(mapStateToProps, { addToCart, seeDetail })(ProductsContainer))