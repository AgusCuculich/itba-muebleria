const API_URL = 'http://localhost:3000/api/productos';

export const fetchProducts = async ({ signal } = {}) => {
    const response = await fetch(API_URL, { signal });

    if (!response.ok) {
        throw new Error(`Error ${response.status} al obtener productos`);
    }

    const json = await response.json();
    return json.data;
};

export const fetchProductById = async (id, { signal } = {}) => {
    const response = await fetch(`${API_URL}/${id}`, { signal });

    if (!response.ok) {
        throw new Error(`Error ${response.status} al obtener el producto`);
    }

    const json = await response.json();
    return json.data;
};

export const createProduct = async (producto) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status} al crear producto`);
    }

    return await response.json();
};
