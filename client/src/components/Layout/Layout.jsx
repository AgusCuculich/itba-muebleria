import { Outlet } from 'react-router'
import { NavBar } from '../Navbar/NavBar'
import { Footer } from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { PanelCarrito } from '../PanelCarrito/PanelCarrito'

// Máximo de unidades por producto
const MAX_CANTIDAD = 10

// Lee el carrito de localStorage. Si no existe o el JSON está roto, devuelve [].
const leerCarrito = () => {
    try {
        return JSON.parse(localStorage.getItem('carrito')) || []
    } catch {
        return []
    }
}

export const Layout = () => {
    // El estado del carrito vive acá: es la única fuente de verdad
    const [carrito, setCarrito] = useState(leerCarrito)

    // Si el panel lateral está abierto o cerrado
    const [panelAbierto, setPanelAbierto] = useState(false)

    // localStorage solo se usa para que el carrito sobreviva a una recarga
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    // Suma `cantidad` unidades si el producto ya está; si no, lo agrega respetando stock
    const agregarAlCarrito = (producto, cantidad = 1) => {
        setCarrito((prev) => {
            const existente = prev.find((item) => item.id === producto.id)
            const stockMaximo = producto.stock ?? existente?.stock ?? MAX_CANTIDAD
            if (stockMaximo <= 0) return prev

            if (existente) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? {
                              ...item,
                              stock: stockMaximo,
                              cantidad: Math.min(stockMaximo, item.cantidad + cantidad),
                          }
                        : item
                )
            }

            return [
                ...prev,
                {
                    ...producto,
                    stock: stockMaximo,
                    cantidad: Math.min(stockMaximo, cantidad),
                },
            ]
        })
    }

    // Suma o resta unidades respetando stock; si queda en 0 o menos, se elimina
    const modificarCantidad = (id, cambio) => {
        setCarrito((prev) =>
            prev
                .map((item) => {
                    if (item.id !== id) return item
                    const stockMaximo = item.stock ?? MAX_CANTIDAD
                    return {
                        ...item,
                        cantidad: Math.min(stockMaximo, item.cantidad + cambio),
                    }
                })
                .filter((item) => item.cantidad > 0)
        )
    }

    // Quita el producto completo sin importar la cantidad
    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id))
    }

    const contador = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0)

    return (
        <>
            <NavBar contador={contador} onAbrirCarrito={() => setPanelAbierto(true)} />
            <PanelCarrito
                abierto={panelAbierto}
                onCerrar={() => setPanelAbierto(false)}
                carrito={carrito}
                onModificarCantidad={modificarCantidad}
                onEliminar={eliminarDelCarrito}
            />
            <Outlet context={{ agregarAlCarrito, carrito }} />
            <Footer />
        </>
    )
}