import React from 'react'

import Login from "../auth/login/Login"
import HomeScreen from "../mainScreen/HomeScreen"
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/LoginSlice'
const MainApp = () => {
    const user = useSelector(selectUser);

    return user ? <HomeScreen /> : <Login />
}

export default MainApp
