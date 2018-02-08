import { combineReducers } from 'redux'
import sort from './sort'
import detail from './detail'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'

export default combineReducers({
    sort,
    cart,
    products,
    detail
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
export const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
    getAddedIds(state)
        .reduce((total, id) =>
            total + getProduct(state, id).price * getQuantity(state, id),
        0)
        .toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

export const getCartProducts = state =>
    getAddedIds(state).map(id => ({
        ...getProduct(state, id),
        quantity: getQuantity(state, id)
    }))

export const getAddedIdsLen = state => getAddedIds(state).length