import { SEE_DETAIL, ADD_TO_CART } from '../constants/ActionTypes'

const initState = {
	"id": 0,
	"title": "",
	"price": 0,
	"inventory": 0,
	"img": "",
	"content": {
		"details": [],
		"brand": ""
	}
}

const detail = (state = initState, action) => {
	switch (action.type) {
		case SEE_DETAIL:
			return {
				...action.detail,
				inventory: action.inventory
			}
		case ADD_TO_CART:
			return {
				...state,
				inventory: state.inventory - 1
			}
		default:
			return state
	}
}

export default detail