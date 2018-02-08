import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "material-ui";
import { LocalGroceryStore, Menu } from "material-ui-icons";
import CartMenu from './partial/PopOver'

const TopBar = ({ classes, badgeContent, cartProducts, handleDrawer, handlePopOver, PopOverOpen, menuIconCounter, AnchorEl, cartBtn, handleClickMenu, menuAnchorEl, menuSelectedIndex, redirectToDetail }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                {
                    menuIconCounter <= 991 && <IconButton className={classes.menuButton}
                        onClick={handleDrawer}
                        aria-label="Menu">
                        <Menu />
                    </IconButton>
                }
                <div className={classes.flex}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography variant="title">E-commerce</Typography>
                    </Link>
                </div>
                <IconButton
                    onClick={handlePopOver}
                    ref={node => cartBtn = node}
                >
                    {
                        badgeContent ? <Badge badgeContent={badgeContent}>
                            <LocalGroceryStore />
                        </Badge> : <LocalGroceryStore />
                    }
                </IconButton>
                <CartMenu
                    handlePopOver={handlePopOver}
                    PopOverOpen={PopOverOpen}
                    AnchorEl={AnchorEl}
                    cartProducts={cartProducts.cartProducts}
                    handleClickMenu={handleClickMenu}
                    menuAnchorEl={menuAnchorEl}
                    menuSelectedIndex={menuSelectedIndex}
                    redirectToDetail={redirectToDetail}
                />
            </Toolbar>
        </AppBar>
    )
}
export default TopBar