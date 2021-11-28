import { connect } from 'mongoose';
import logging from '../config/logging';

const NAMESPACE = 'CONNECTDB';

const connectDB = async (connectionString: any) => {
    await connect(connectionString)
        .then(() =>
            logging.success(NAMESPACE, 'MongoDB connection established')
        )
        .catch((err) => {
            logging.error(NAMESPACE, err.message);

            if (err.message.includes('Invalid connection string'))
                logging.info(
                    NAMESPACE,
                    'Please check your .env file and configure it.'
                );
        });
};

export default connectDB;
