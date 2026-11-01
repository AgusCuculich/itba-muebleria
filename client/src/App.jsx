import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout/Layout'
import { Home } from './pages/Home/Home'
import { Producto } from './pages/Producto/Producto.jsx'
import { Productos } from './pages/Productos/Productos.jsx'
import { Contacto } from './pages/Contacto/Contacto.jsx'
import { ProductForm } from './pages/Admin/ProductForm.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/productos/:id', element: <Producto /> },
      { path: '/productos', element: <Productos /> },
      { path: '/contacto', element: <Contacto /> },
      { path: '/admin/crear-producto', element: <ProductForm /> },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}

export default App
