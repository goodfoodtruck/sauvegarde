import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './sass/index.scss'
import { GamePage } from './pages/GamePage'
import { HomePage } from './pages/HomePage'
import { ErrorPage } from './pages/ErrorPage'
import { useGameLoader } from './hooks/useGameLoader'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/games/:slug",
    element: <GamePage />,
    loader: useGameLoader,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
