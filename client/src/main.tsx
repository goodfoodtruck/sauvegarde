import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './sass/index.scss'
import { GamePage } from './pages/GamePage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import { useGameLoader } from './hooks/useGameLoader'
import { RootLayout } from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<HomePage />}
      />
      <Route
        path="/games/:slug"
        element={<GamePage />}
        loader={useGameLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
