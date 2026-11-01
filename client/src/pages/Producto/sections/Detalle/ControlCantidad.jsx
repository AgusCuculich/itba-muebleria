import './ControlCantidad.css';
 
export const ControlCantidad = ({ cantidad, onChange, max = 10, disabled = false }) => {
    const limiteSuperior = Math.max(1, max);

    return (
        <div className={`control-cantidad ${disabled ? 'control-cantidad--deshabilitado' : ''}`}>
            <button
                type="button"
                className="btn-cantidad"
                onClick={() => onChange(Math.max(1, cantidad - 1))}
                disabled={disabled || cantidad <= 1}
                aria-label="Disminuir cantidad"
            >
                -
            </button>
            <input
                type="number"
                className="input-cantidad"
                value={disabled ? 0 : cantidad}
                min={disabled ? 0 : 1}
                max={limiteSuperior}
                readOnly
                disabled={disabled}
                aria-label="Cantidad"
            />
            <button
                type="button"
                className="btn-cantidad"
                onClick={() => onChange(Math.min(limiteSuperior, cantidad + 1))}
                disabled={disabled || cantidad >= limiteSuperior}
                aria-label="Aumentar cantidad"
            >
                +
            </button>
        </div>
    );
};