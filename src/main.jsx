import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../src/index.scss'

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './layout'
import Welcome from './Pages/Welcome'
import Menu from './Pages/Menu'
import JoinGame from './Pages/JoinGame'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Welcome /> },
      {
        path: 'Menu',
        children: [
          { path: '/Menu', element: <Menu /> }
        ]
      },
      {
        path: 'JoinGame',
        children: [{ path: '/JoinGame', element: <JoinGame/>}]
      }
    ]
  }])

ReactDOM.createRoot(document.getElementById('root')).render(
  <> 

<RouterProvider router={router}/>

 </>
)
