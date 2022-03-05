import jwt from 'jsonwebtoken'

import User from '../models/User';

import { comparePassword } from '../services/auth'

import authConfig from '../config/auth'

class SessionController {
  async create(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({email})

      if (!user) {
        return response.status(401).json({message: 'User/Password Invalid.'})
      }

      const passwordMatch = comparePassword(password, user.password);

      if (!passwordMatch) {
        return response.status(401).json({message: 'User/Password Invalid.'})
      }

      const { id } = user;

      const token = {
        user: {
          id,
          email
        },
        token: jwt.sign(
          { id }, 
          authConfig.secretKey, 
          { expiresIn: authConfig.expires })
      }

      return response.status(200).json(token)

    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }
  }

}

export default new SessionController();