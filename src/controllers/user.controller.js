import HttpStatus from "http-status-codes";
import * as UserService from "../services/user.service";

export const getUserInfo = async (req, res) => {
  try {
    const data = await UserService.getUserInfo(req.body.email);
    res.status(HttpStatus.OK).json({
      code: data.code,
      data: data.data,
      message: data.message,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const data = await UserService.signup(req.body);
    res.status(HttpStatus.OK).json({
      code: data.code,
      data: data.data,
      message: data.message,
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const data = await UserService.signin(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: data.code,
      token: data.data,
      message: data.message,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message,
    });
  }
};
