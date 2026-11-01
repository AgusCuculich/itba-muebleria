import { useEffect, useState } from 'react';
import { Boton } from '../../../../components/Boton/Boton.jsx';
import { ControlCantidad } from './ControlCantidad.jsx';
import './Detalle.css';

const IMAGE_URL = 'http://localhost:3000/images/';

export const Detalle = ({
    producto,
    cantidad,
    setCantidad,
    agregarAlCarrito,
    carrito = [],
}) => {
    const [agregado, setAgregado] = useState(false);
    const { nombre, imagen, precio, descripcion, stock = 0 } = producto;
    const id = producto.slug ?? producto._id;

    const itemEnCarrito = carrito.find((item) => item.id === id);
    const enCarrito = itemEnCarrito?.cantidad || 0;
    const stockRestante = Math.max(0, stock - enCarrito);
    const puedeComprar = stockRestante > 0;

    // Si lo que ya hay en el carrito reduce el disponible por debajo de la selección, ajusta
    useEffect(() => {
        if (!puedeComprar) {
            setCantidad(1);
        } else if (cantidad > stockRestante) {
            setCantidad(stockRestante);
        }
    }, [stockRestante, puedeComprar, cantidad, setCantidad]);

    // El mensaje de confirmación se apaga solo a los 2 segundos
    useEffect(() => {
        if (!agregado) return;
        const timer = setTimeout(() => setAgregado(false), 2000);
        return () => clearTimeout(timer);
    }, [agregado]);

    const handleAgregar = () => {
        if (!puedeComprar) return;
        // Al carrito va también stock para que el panel limite futuros incrementos
        agregarAlCarrito({ id, nombre, precio, imagen, stock }, cantidad);
        setAgregado(true);
    };

    return (
        <section className="contenedor-detalle">
            <div className="columna-imagen-detalle">
                <div className="envoltura-imagen-grande">
                    <img
                        src={`${IMAGE_URL}${imagen}`}
                        alt={nombre}
                        className="imagen-detalle-grande"
                    />
                </div>
            </div>

            <div className="columna-info-detalle">
                <div className="bloque-encabezado-producto">
                    <h1 className="titulo-producto-detalle">{nombre}</h1>
                    {precio ? (
                        <>
                            <div className="precio-producto-detalle">$ {precio.toLocaleString('es-AR')}</div>
                            <p className="cuotas-texto">
                                3 cuotas sin interés de $ {Math.round(precio / 3).toLocaleString('es-AR')}
                            </p>
                        </>
                    ) : (
                        <p className="cuotas-texto">Consultá el precio con el taller.</p>
                    )}

                    <p className={`stock-texto ${puedeComprar ? 'stock-ok' : 'stock-agotado'}`}>
                        {stock <= 0
                            ? 'Sin stock disponible'
                            : stockRestante === 0
                            ? `Ya tenés el máximo disponible (${stock}) en tu carrito`
                            : enCarrito > 0
                            ? `Quedan ${stockRestante} disponibles (${enCarrito} ya en tu carrito)`
                            : `Stock disponible: ${stock} unidades`}
                    </p>

                    <div className="bloque-acciones-compra">
                        <ControlCantidad
                            cantidad={cantidad}
                            onChange={setCantidad}
                            max={stockRestante}
                            disabled={!puedeComprar}
                        />
                        <Boton
                            className="btn-compra-detalle"
                            onClick={handleAgregar}
                            disabled={!puedeComprar}
                        >
                            {!puedeComprar
                                ? stock > 0
                                    ? 'Máximo en carrito'
                                    : 'Agotado'
                                : agregado
                                ? '¡Agregado al carrito!'
                                : 'Sumalo a tu hogar'}
                        </Boton>
                    </div>
                </div>

                <div className="bloque-contenido-adicional">
                    {descripcion && <p>{descripcion}</p>}
                </div>
            </div>
        </section>
    );
};