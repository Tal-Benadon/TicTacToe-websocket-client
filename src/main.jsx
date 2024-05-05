import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import SymbolButton from './componnents/SymbolButton'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='container'>
      <SymbolButton />
      <SymbolButton />

    </div>
  </React.StrictMode>,
)
