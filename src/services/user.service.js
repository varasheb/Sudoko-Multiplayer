import user from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize, { DataTypes } from '../config/database';

const User= require('../models/user.model')(sequelize, DataTypes);

const key='varshab111';

export const getuserInfo = async (email) => {

  const user = await User.findOne({ where: { email } });
  if(!user)
  throw new Error("Invalid Token payload");
  return user
};

//create new user
export const signup = async (body) => {
  const user = await User.findOne({ where: { email:body.email } });
  if(user)
  throw new Error('user Aleady Exist')
  body.password= await bcrypt.hash(body.password,10)
  const data = await User.create(body);
  return data;
};

export const signin = async (body) => {
  const user = await User.findOne({ where: { email:body.email } });
  if(!user||!(await bcrypt.compare(body.password, user.password))){
    throw new Error("Email and password doesnot match");
  }
  const token = jwt.sign({ email:user.email }, key);
  return  token ;

};



