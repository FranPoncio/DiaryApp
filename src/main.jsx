import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { aplicarFuente, fuenteGuardada } from './lib/temas.js'

/* La fuente se pide a Google apenas arranca, antes de dibujar: el tema de
   colores ya lo dejó puesto el script de index.html. */
aplicarFuente(fuenteGuardada())

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)

/* Service worker: solo en producción, para no pelear con el HMR de Vite. */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
