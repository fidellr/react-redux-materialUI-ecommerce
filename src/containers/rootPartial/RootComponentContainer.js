import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getAddedIdsLen, getCartProducts } from '../../reducers'
import RootComponent from '../../components/RootComponent'

class RootContainer extends Component {
    constructor() {
        super()
        this.state = {
            mobileDrawerOpen: false,
            topBarPop: false,
            winWidth: window.innerWidth,
            topBarPopAnchorEl: null
        }
        this.handleWinWidth = this.handleWinWidth.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleWinWidth)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWinWidth)
    }
    handleWinWidth = () => this.setState({ winWidth: window.innerWidth })
    handleDrawer = () => this.setState({ mobileDrawerOpen: !this.state.mobileDrawerOpen })
    handlePopOver = () => this.setState({ topBarPop: !this.state.topBarPop, topBarPopAnchorEl: findDOMNode(this.cartButton) })
    handleClickMenu = id => {

        this.props.children.props.history.push('/cart')
    }

    render() {
        const { children, cartProducts } = this.props
        return (
            <RootComponent
                cartProducts={cartProducts}
                menuIconCounter={this.state.winWidth}
                children={children}
                mobileDrawerOpen={this.state.mobileDrawerOpen}
                handleDrawer={this.handleDrawer}
                handlePopOver={this.handlePopOver}
                PopOverOpen={this.state.topBarPop}
                AnchorEl={this.state.topBarPopAnchorEl}
                cartBtn={this.cartButton}
                handleClickMenu={this.handleClickMenu}
            />
        )
    }
}

const cartItemsCount = state => getAddedIdsLen(state)
const cartProducts = state => getCartProducts(state)
const cartMemoizedSelector = createSelector(
    cartItemsCount, cartProducts,
    (cartItemsCount, cartProducts) => ({ cartItemsCount: cartItemsCount, cartProducts: cartProducts })
)

const mapStateToProps = (state) => ({
    cartItemsCount: cartMemoizedSelector(state),
    cartProducts: cartMemoizedSelector(state)

})
export default connect(mapStateToProps)(RootContainer)