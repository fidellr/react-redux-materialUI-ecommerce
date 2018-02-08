import React from 'react';
import {  Grid, Avatar } from "material-ui";
import Card, { CardHeader } from 'material-ui/Card';
import withStyles from 'material-ui/styles/withStyles';
import MediaDetails from './partial/Media'
import ContentDetails from './partial/Content'
import ActionDetails from './partial/Action'
import red from 'material-ui/colors/red';

const Styles = theme => ({
    root: { flexGrow: 1 },
    gridListRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: { overflowX: 'hidden' },
    card: {
        maxWidth: '85.5vw',
        margin: 5,
        [theme.breakpoints.up('md')]: {
            width: '85.5vw',
            marginTop: '8%',
            marginLeft: '7%',
            marginRight: '7%'
        },
        [theme.breakpoints.down('md')]: {
            margin: '5px 10px',
            overflow: 'hidden'
        }
    },
    avatar: { backgroundColor: red[500] },
    headerTitle: { fontWeight: 500, fontSize: '1.2rem' }

})
const ProductsDetailContainer = ({ product, classes }) => (
    <Grid container className={classes.root}>
        <div className={classes.gridListRoot}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            R
                </Avatar>
                    }
                    classes={{ title: classes.headerTitle }}
                    title={product.title}
                    subheader={(new Date()).toLocaleDateString()}
                />
                <MediaDetails
                    image={product.img}
                    title={product.title}
                />
                <ContentDetails
                    inventory={product.inventory}
                    price={product.price}
                />
                <ActionDetails
                    inventory={product.inventory}
                    id={product.id}
                    content={product.content}
                    brand={product.content.brand}
                    details={product.content.details}
                />
            </Card>
        </div>
    </Grid>
)
export default withStyles(Styles)(ProductsDetailContainer)