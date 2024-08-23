import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';


export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw new Error('Token Not provided');

    bearerToken = bearerToken.split(' ')[1];
    const secretKey = "sudokuPro";
    const { email } = await jwt.verify(bearerToken,secretKey);
    req.body.email = email;
    req.body.token = bearerToken;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      error: error.message
  })
  }
};
