import { SELECT_SORT_DEFAULT, SELECT_SORT_BY_VALUE_INC, SELECT_SORT_BY_VALUE_DEC } from '../constants/ActionTypes'

const OPTIONS = [
  { val: 0, label: "What's new" },
  { val: 1, label: "Price low to high" },
  { val: 2, label: "Price high to low" },
]

const initState = {
  "options": OPTIONS,
  "selected": 0,
}

const sort = (state = initState, action) => {
  switch (action.type) {
    case SELECT_SORT_BY_VALUE_DEC:
    case SELECT_SORT_BY_VALUE_INC:
    case SELECT_SORT_DEFAULT:
      return {
        ...state,
        selected: action.val
      }
    default:
      return state
  }
}

export default sort