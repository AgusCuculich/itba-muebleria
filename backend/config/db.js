import mongoose from 'mongoose';

export async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB");
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
        process.exit(1);
    }
}

export async function disconnectFromMongoDB() {
    await mongoose.connection.close();
    console.log("Desconectado de MongoDB");
}
