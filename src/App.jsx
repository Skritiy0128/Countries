import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home, { fetchApi } from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import MainLayout from './layouts/MainLayout'
import Detail, { fetchCountry } from './pages/Detail'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home />} loader={fetchApi} errorElement={<Error/>} />
        <Route path='/:name' element={<Detail />} loader={fetchCountry} errorElement={<Error/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Route>
    )
  );
  
  return (
    <RouterProvider router={router} />
  )
}

export default App