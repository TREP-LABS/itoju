import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUrl: process.env.DB_DEV_URL,
  jwtSecret: process.env.JWT_SECRET,
  smsKey: process.env.SMS_TEST_KEY,
  serverAppUrl: process.env.SERVER_APP_URL,
  bcryptHashSaltRounds: process.env.BCRYPT_HASH_SALT_ROUNDS,
  mailgun: {
    apikey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
  email: {
    noreply: 'noreply@itoju.com',
  },
};
