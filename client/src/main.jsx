import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/Store.js'
import {Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
    <App />
    </Provider>
  </StrictMode>,
)
