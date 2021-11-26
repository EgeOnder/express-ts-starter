import { connect } from 'mongoose';
import logging from '../config/logging';

const NAMESPACE = 'CONNECTDB';

const connectDB = async (connectionString: any) => {
    await connect(connectionString)
        .then(() =>
            logging.success(NAMESPACE, 'MongoDB connection established')
        )
        .catch((err) => logging.error(NAMESPACE, err.message));
};

export default connectDB;
