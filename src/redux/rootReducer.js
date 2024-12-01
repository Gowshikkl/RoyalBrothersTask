import React from 'react'
import { combineReducers } from 'redux'
import CommonReducer from './commonReducer'
import HomeReducer from './homeReducer'

export default combineReducers({
    CommonReducer,
    HomeReducer ,
})