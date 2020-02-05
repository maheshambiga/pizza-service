import mongoose from 'mongoose';
import config from './../utils/config';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoReconnect: true,
    reconnectTries: 30,
    reconnectInterval: 1000,
    useFindAndModify: false
};

const connectMongo = async () => {
    const url = config.databaseURL;
    try {
        const connection = await mongoose.connect(url, options);
        return connection.connection.db;
    }catch (e) {
        return e;
    }
    /*const db = mongoose.createConnection(config.mongoConnectionURL, options);

    db.once('open', function() {
        console.log('Mongo db is open now!');
    });
    db.once('error', function(err) {
        console.log('Error occurred while creating connection! '+err);
    });*/
};

export default connectMongo;
