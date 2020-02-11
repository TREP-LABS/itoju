import mongoose from 'mongoose';
import config from '../../config/vars';

const { dbUrl } = config;

export default () => {
  console.info(`Start setting up database for ${config.env} environment`);
  mongoose.connect(dbUrl, {
    useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true,
  });
  mongoose.Promise = global.Promise;
  console.info('Finished setting up database');
};
