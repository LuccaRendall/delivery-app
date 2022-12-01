const md5 = require('md5');
const JWT = require('../auth/JWT');
const UserModel = require('../models/userModel');
const CustomError = require('../utils/CustomError');

const register = async (obj) => {
  const { name, email, password } = obj;
  const user = await UserModel.find({ email });
  if (user) throw new CustomError('Conflict', 409);
  await UserModel.create({
    name,
    email,
    password: md5(password),
    role: 'customer',
  });
  return { code: 201, message: 'Created' };
};

const registerAdmin = async (obj, token) => {
  const { name, email, password } = obj;
  const { role } = JWT.authenticate(token);
  if (role !== 'administrator') throw new CustomError('Unauthorized', 401);
  const user = await UserModel.find({ email });
  if (user) throw new CustomError('Conflict', 409);
  await UserModel.create({
    name,
    email,
    password: md5(password),
    role: 'administrator',
  });
  return { code: 201, message: 'Created' };
};

module.exports = { register, registerAdmin };
