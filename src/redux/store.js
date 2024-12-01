import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import rootReducer from './rootReducer'

const Store = configureStore({
    reducer : rootReducer
})

export default Store;