import { connectToMongoDB, disconnectFromMongoDB } from '../config/db.js';
import { ProductModel } from '../models/productModel.js';
import productos from '../data/products.js';

const seed = async () => {
    await connectToMongoDB();

    console.log('Borrando productos existentes...');
    await ProductModel.deleteMany({});

    console.log(`Insertando ${productos.length} productos...`);

    // El slug se genera automáticamente desde el nombre via el hook pre('validate')
    // Insertamos los productos uno a uno para que el hook pre('validate') se dispare
    for (const producto of productos) {
        await new ProductModel(producto).save();
    }

    console.log('✓ Seed completado exitosamente');
    await disconnectFromMongoDB();
    process.exit(0);
};

seed().catch((err) => {
    console.error('Error en seed:', err);
    process.exit(1);
});
