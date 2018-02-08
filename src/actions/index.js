import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => dispatch(receiveProducts(products)))
}

export const onSelectSort = val => dispatch => {
  switch (val) {
    case 0:
      shop.getProducts(products => {
        dispatch({
          type: types.SELECT_SORT_DEFAULT,
          val,
          products
        })
      })
      break;
    case 1:
      shop.getProducts(products => {
        dispatch({
          type: types.SELECT_SORT_BY_VALUE_INC,
          val,
          products
        })
      })
      break;
    case 2:
      shop.getProducts(products => {
        dispatch({
          type: types.SELECT_SORT_BY_VALUE_DEC,
          val,
          products
        })
      })
      break;
    default:
      shop.getProducts(products => {
        dispatch({
          type: types.SELECT_SORT_DEFAULT,
          val,
          products
        })
      })
      break;
  }

}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = (e, productId) => (dispatch, getState) => {
  e.preventDefault()
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

const removeFromCartAction = (productId, qty) => ({
  type: types.REMOVE_FROM_CART,
  productId,
  qty
})

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch(removeFromCartAction(productId, getState().cart.quantityById[productId]))
}

const seeDetailProduct = (detail, inventory) => ({
  type: types.SEE_DETAIL,
  detail,
  inventory
})

export const seeDetail = productId => (dispatch, getState) => {
  shop.getDetail(productId, (detail) => {
    dispatch(seeDetailProduct(detail, getState().products.byId[productId].inventory))
  })
}

export const changeQty = (productId, qty) => (dispatch, getState) => {
  const qtyDiff = qty - getState().cart.quantityById[productId]
  dispatch({
    type: types.CHANGE_QTY,
    productId,
    qtyDiff
  })
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
  })
}