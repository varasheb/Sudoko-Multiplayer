import sequelize, { DataTypes } from "../config/database";
import { UniqueConstraintError } from "sequelize";
import HttpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRETKEY = "sudokuPro";

const User = require("../models/user.model")(sequelize, DataTypes);

export const getUserInfo = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return {
      code: HttpStatus.UNAUTHORIZED, 
      message: "User not found"
    }

  }
  console.log("-->user", user);
  
  return {
    code: HttpStatus.OK,
    data: user,
    message: "User data fetched successfully",
  };
};

//create new user
export const signup = async (userDetails) => {
  try {
    if (userDetails != null) {
      userDetails.password = await bcrypt.hash(userDetails.password, 10);

      const data = await User.create(userDetails);
      return {
        code: HttpStatus.CREATED,
        data: data,
        message: "Created user successfully",
      };
    } else {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: "Enter details correctly",
      };
    }
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return {
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: "User with this email already exists",
      };
    } else {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: "Somethinf went wrong",
      };
    }
  }
};

export const signin = async (userDetails) => {
  try {
    if (!userDetails.email || !userDetails.password) {
      return {
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: "Email and password are required",
      };
    }

    const user = await User.findOne({ where: { email: userDetails.email } });

    if (!user) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: "Invalid email or password",
      };
    }

    const validPassword = await bcrypt.compare(
      userDetails.password,
      user.password
    );

    if (!validPassword) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: "Invalid email or password",
      };
    }

    // generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRETKEY);

    return {
      code: HttpStatus.OK,
      data: token,
      message: "Login successful",
    };
  } catch (error) {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: [],
      message: error.message,
    };
  }
};
