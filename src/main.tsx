import { createRoot } from 'react-dom/client'
import './style/index.css'
import { AppRouter } from './router/AppRouter'

createRoot(document.getElementById('root')!).render(
  <AppRouter />
)
