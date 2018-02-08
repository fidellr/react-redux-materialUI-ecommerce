import React from 'react';
import { Link } from "react-router-dom";
import { Typography, Hidden, Drawer, List, ListItem, Divider } from "material-ui";
import withStyles from 'material-ui/styles/withStyles';
import TopBar from './TopBar'

const Styles = theme => ({
    root: {
        width: '100%',
        zIndex: 1
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '3.7% 2% 0% 0%',
        [theme.breakpoints.down('xs')]: {
            padding: '13% 3% 5% 3%'
        },
        [theme.breakpoints.up('md')]: {
            padding: '3.7% 2% 0% 0%',
        }
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    content: theme.mixins.gutters({
        [theme.breakpoints.up('md')]: {
            height: 'calc(100% - 64px)',
            width: '80%',
            marginLeft: '20%',
            marginTop: '4%'
        },
        [theme.breakpoints.down('md')]: {
            height: 'calc(100% - 56px)',
            width: '100%',
            paddingTop: 16,
            paddingBottom: 16,
            marginTop: theme.spacing.unit * 3,
        }
    }),
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: 240,
            zIndex: 0,
        },
    },
    drawerHeader: {
        [theme.breakpoints.up('md')]: theme.mixins.toolbar
    },
    logo: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            margin: '0 auto'
        }
    }
});

const RootComponent = (props) => {
    const { classes, cartProducts, handleDrawer, mobileDrawerOpen, theme, menuIconCounter, handlePopOver, PopOverOpen, AnchorEl, cartBtn, handleClickMenu, menuAnchorEl, menuSelectedIndex } = props
    const drawerList = (
        <div>
            <div className={classes.drawerHeader} />
            <List>
                <ListItem button component={Link} to="/">
                    <Typography variant="subheading">Home</Typography>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button component={Link} to="/cart">
                    <Typography variant="subheading">Purchase History</Typography>
                </ListItem>
            </List>
        </div>
    );
    const badgeContent = cartProducts.cartItemsCount > 0 ? cartProducts.cartItemsCount : null
    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <TopBar
                    classes={classes}
                    badgeContent={badgeContent}
                    menuIconCounter={menuIconCounter}
                    handleDrawer={handleDrawer}
                    cartProducts={cartProducts}
                    handlePopOver={handlePopOver}
                    PopOverOpen={PopOverOpen}
                    AnchorEl={AnchorEl}
                    cartBtn={cartBtn}
                    handleClickMenu={handleClickMenu}
                    menuAnchorEl={menuAnchorEl}
                    menuSelectedIndex={menuSelectedIndex}
                />
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileDrawerOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onClose={handleDrawer}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawerList}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        elevation={120}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawerList}
                    </Drawer>
                </Hidden>
                <div className={classes.content}>
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    )
}
export default withStyles(Styles, { withTheme: true })(RootComponent)