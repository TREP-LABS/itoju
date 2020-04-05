import '../utils/validateEnvironmentVars';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import model from '../models/schemas/user.model';

const jwtSecret = process.env.JWT_SECRET;

const createToken = ({ id }) => jwt.sign({ id }, jwtSecret, { expiresIn: '3d' });

let user = {
  id: '',
  name: 'test name',
  phone: '+2347041900419',
  password: '',
  confirmedPhone: true,
};

export default async () => {
  const stringPass = 'Password1234';
  const hashedpass = await bcrypt.hash(
    stringPass, Number.parseInt(process.env.BCRYPT_HASH_SALT_ROUNDS, 10),
  );
  try {
    const { _id: userId } = await db.create(
      model.user, { ...user, password: hashedpass },
    );


    user = {
      ...user,
      id: userId,
      password: hashedpass,
      stringPass,
      authToken: createToken({ id: userId }),
    };
  } catch (error) {
    console.log(error);
  }
  process.env.TEST_GLOBALS = JSON.stringify({
    user,
  });
};
