import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const user = [];

export const getUserInfo = async (email) => {
  let data;
  user.forEach((ele) => {
    if (ele.email == email) {
      data = ele;
    }
  });
  if (!data) throw new Error("Invalid Token payload");
  return data;
};

//create new user
export const signup = async (body) => {
  user.forEach((ele) => {
    if (body.email == ele.email) {
      throw new Error("User Already Exist");
    }
  });
  body.password = await bcrypt.hash(body.password, 10);
  const data = new User(body);
  user.push(data);
  return data;
};

//create new user
export const signin = async (body) => {
  let data;
  user.forEach((ele) => {
    if (body.email === ele.email) {
      data = ele;
    }
  });
  if (!data || !(await bcrypt.compare(body.password, data.password))) {
    throw new Error("Email and password doesnot match");
  }
  const token = jwt.sign({ email: data.email }, "your-secret-key", {
    expiresIn: "1h",
  });

  return token;
};

export const forgetPassword = async (body) => {
  
};
