import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import SymbolButton from './componnents/SymbolButton'
import ChoosePlayerPage from './pages/ChoosePlayerPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChoosePlayerPage />

  </React.StrictMode>,
)
