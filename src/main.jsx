import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../src/index.scss'

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './layout'
import Welcome from './pages/Welcome'
import Menu from './pages/Menu'
import JoinGame from './pages/JoinGame'
import ChoosePlayerPage from './pages/ChoosePlayerPage'
import GameBoardPage from './pages/GameBoardPage'
import ButtonBack from './componnents/ButtonBack'
import Waiting from './pages/Waiting'

const router = createBrowserRouter([
  {
    element: <Layout />, children: [
      {
        path: '/', element: <Welcome />
      },
      {
        path: 'Menu', element: <Menu /> 
      },
      {
        element: <ButtonBack />, children: [
          {
            path: 'JoinGame', element: <JoinGame />
          },
          {
            path: 'ChoosePlayer', element: <ChoosePlayerPage />
          },
          {
            path: 'Waiting', element: <Waiting />
          }
        ]
      },
      {
        path: 'GameBoard', element: <GameBoardPage />
      }
    ]
  },
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>

    <RouterProvider router={router} />

  </>
)
