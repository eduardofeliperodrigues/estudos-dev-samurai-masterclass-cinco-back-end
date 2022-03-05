import jwt from 'jsonwebtoken';
import { promisify } from 'util'

import authConfig from '../config/auth'

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token was not provided.'})
  }

  const [, token] = authHeader.split(' ');

  try {
    // const decoded = jwt.verify(token, authConfig.secretKey) // jwt.verify syncrono
    
    const decoded = await promisify(jwt.verify)(token, authConfig.secretKey) // tornando o jwt.verify em uma promise com promisify e passando os parametros
    
    request.userId = decoded.id

    return next()
    
  } catch (error) {
    return response.status(401).json({ message: 'Token is not valid.'})
  }

}