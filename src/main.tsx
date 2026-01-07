import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
//import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import './index.css'

// Import pages
import HomePage from './pages/home-page'
import SignInPage from './pages/sign-in-page'
import { EasyAuthBlock } from './components/easy-auth-block'

// Create root route: anything here will be visible on all pages
const rootRoute = createRootRoute({
  component: () => (
    <>
      <EasyAuthBlock />
      <Outlet />
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
})

// Create index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

// Create sign-in route
const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignInPage,
})

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, signInRoute])

// Create router
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
