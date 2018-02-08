/**
 API Mocking process
 */
import _products from './products.json'
import prod1 from './prod1.json'
import prod2 from './prod2.json'
import prod3 from './prod3.json'
import prod4 from './prod4.json'

const TIMEOUT = 100
const FILES = [prod1, prod2, prod3, prod4]

export default {
  getDetail: (productId, getFrom, timeout) => setTimeout(() => getFrom(FILES[productId - 1]), timeout || TIMEOUT),
  getProducts: (getFrom, timeout) => setTimeout(() => getFrom(_products), timeout || TIMEOUT),
  buyProducts: (payload, getFrom, timeout) => setTimeout(() => getFrom(), timeout || TIMEOUT)
}