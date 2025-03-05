import {combineReducers} from 'redux'
import { cartData ,authReducer } from './reducer'
import {productData} from './productReducer'
export default combineReducers({
    cartData,
    productData,
    auth:authReducer,
})