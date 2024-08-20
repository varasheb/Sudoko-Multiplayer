import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



export const getUserInfo = async (req, res) => {
  try {
    const data = await UserService.getUserInfo(req.body.email);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message
  })
  }
};


export const signup = async (req, res) => {
  try {
    const data = await UserService.signup(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      error: error.message
  })
};
}

export const signin = async (req, res) => {
  try {
    const data = await UserService.signin(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      token: data,
      message: 'User signin successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message
  })
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Check mail for reset password link'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message
  })
  }
};


