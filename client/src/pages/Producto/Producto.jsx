import { useState, useEffect } from 'react';
import { useParams, useLocation, useOutletContext } from 'react-router';
import { fetchProductById } from '../../services/api.js';
import { Boton } from '../../components/Boton/Boton.jsx';
import { Acordeones } from './sections/Acordeones/Acordeones.jsx';
import { Breadcrumb } from './sections/Breadcrumb/Breadcrumb.jsx';
import { Detalle } from './sections/Detalle/Detalle.jsx';
import './Producto.css';

export const Producto = () => {
    const { id } = useParams();
    const desdeInicio = useLocation().state?.desde === '/';
    // Función que viene del Layout (dueño del estado del carrito)
    const { agregarAlCarrito, carrito = [] } = useOutletContext();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        const controller = new AbortController();
        setCargando(true);
        setError(false);

        fetchProductById(id, { signal: controller.signal })
            .then(setProducto)
            .catch((err) => {
                if (err.name !== 'AbortError') setError(true);
            })
            .finally(() => {
                if (!controller.signal.aborted) setCargando(false);
            });

        return () => controller.abort();
    }, [id]);

    useEffect(() => {
        if (!producto) return;
        const tituloAnterior = document.title;
        document.title = `Hermanos Jota - ${producto.nombre}`;
        return () => { document.title = tituloAnterior; };
    }, [producto]);

    if (cargando) {
        return (
            <main>
                <section className="contenedor-detalle-error">
                    <p className="mensaje-carga" role="status">Cargando detalles de la pieza...</p>
                </section>
            </main>
        );
    }

    if (error || !producto) {
        return (
            <main>
                <section className="contenedor-detalle-error">
                    <div className="mensaje-estado-detalle" role="alert">
                        <h2>No encontramos la pieza seleccionada</h2>
                        <p>Podés explorar todas las piezas disponibles en nuestro catálogo.</p>
                        <Boton to="/productos">Volver al Catálogo</Boton>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <Breadcrumb nombre={producto.nombre} desdeInicio={desdeInicio} />
            <Detalle
                producto={producto}
                cantidad={cantidad}
                setCantidad={setCantidad}
                agregarAlCarrito={agregarAlCarrito}
                carrito={carrito}
            />
            <Acordeones />
        </main>
    );
};