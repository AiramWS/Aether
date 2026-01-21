import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { loadTheme } from './utils/themeHelper';
import App from './App.tsx' 

loadTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })
