import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: String,
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

productSchema.pre('validate', async function () {
    if (this.isNew) {
        this.slug = slugify(this.nombre, { lower: true, strict: true });
    }
});

export const ProductModel = mongoose.model('Product', productSchema);