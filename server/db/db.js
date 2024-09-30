import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        console.log(process.env.MONGODB_URL);
        
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectToDatabase;
