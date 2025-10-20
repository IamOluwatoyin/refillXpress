import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import RouteErr from './RouteErr'
import HomePage from '../Pages/Home/HomePage'
import Layout from './Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="*" element={<RouteErr/>}/>
         <Route element={<Layout/>}/>
         <Route path="/" element={<HomePage/>}/>
         
      </Routes>
    </BrowserRouter>
  )
}

export default Router
