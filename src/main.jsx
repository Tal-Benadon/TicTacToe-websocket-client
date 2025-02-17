import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../src/index.scss'

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './layout'
import Welcome from './pages/Welcome'
import Menu from './pages/Menu'
import JoinGame from './pages/JoinGame'
import ButtonBack from './componnents/ButtonBack'
import Waiting from './pages/Waiting'
import GameBoardPage from './pages/GameBoardPage'
import ChoosePlayerPage from './pages/ChoosePlayerPage'
import PendingGamePage from './pages/PendingGamePage'
import SettingsPage from './pages/SettingsPage'

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
            path: 'settings', element: < SettingsPage />
          },
          {
            path: 'JoinGame', element: <JoinGame />
          },
          {
            path: 'Waiting', element: <Waiting />
          },
          {
            path: 'ChoosePlayer', element: <ChoosePlayerPage />
          },
          {
            path: 'PendingGame', element: <PendingGamePage />
          },
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
